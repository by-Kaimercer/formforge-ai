import { NextResponse } from "next/server";
import { MOCK_PROGRAM } from "@/lib/mock-data";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const groqKey = process.env.OPENROUTER_API_KEY;

    if (!groqKey) {
      await new Promise((r) => setTimeout(r, 3000));
      return NextResponse.json({
        success: true,
        program: MOCK_PROGRAM,
        programId: "demo",
        demo: true,
      });
    }

    // --- Free-tier gate: free users get 1 program, Pro is unlimited. ---
    // Only enforced for authenticated users; demo/unauth flow is unaffected.
    let usageBase = 0;
    try {
      const { createClient } = await import("@/lib/supabase-server");
      const supabase = await createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("plan, programs_generated")
          .eq("id", user.id)
          .single();

        usageBase = profile?.programs_generated ?? 0;

        if (profile && profile.plan === "free" && usageBase >= 1) {
          return NextResponse.json(
            {
              success: false,
              error: "FREE_LIMIT_REACHED",
              message:
                "Your free plan includes 1 program. Upgrade to Pro for unlimited generations.",
            },
            { status: 402 }
          );
        }
      }
    } catch {
      // Supabase not configured — cannot enforce limit, continue.
    }

    const { generateProgram } = await import("@/lib/groq");
    const { buildProfileContext } = await import("@/lib/rag");
    const { defaultProfile } = await import("@/lib/types");
    const profileContext = buildProfileContext(body.profile ?? defaultProfile);
    const raw = await generateProgram(profileContext);
    const program = JSON.parse(raw);

    let programId = `prog_${Date.now()}`;

    try {
      const { createClient } = await import("@/lib/supabase-server");
      const supabase = await createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        if (body.profile) {
          const profileFields = { ...body.profile };
          delete profileFields.id;
          delete profileFields.user_id;
          await supabase
            .from("user_profiles")
            .upsert({ user_id: user.id, ...profileFields }, { onConflict: "user_id" });
        }

        await supabase
          .from("programs")
          .update({ is_active: false })
          .eq("user_id", user.id);

        const { data } = await supabase
          .from("programs")
          .insert({
            user_id: user.id,
            program_json: program,
            program_name: program.programName,
            duration_weeks: program.durationWeeks,
            split: program.split,
            is_active: true,
            slug: `prog-${Date.now()}`,
          })
          .select("id")
          .single();

        if (data) programId = data.id;

        // Increment the usage counter via the service role — programs_generated
        // is a locked billing column that users cannot modify themselves.
        try {
          const { createAdminClient } = await import("@/lib/supabase-admin");
          const admin = createAdminClient();
          await admin
            .from("profiles")
            .update({ programs_generated: usageBase + 1 })
            .eq("id", user.id);
        } catch (incErr) {
          console.warn("Usage counter increment skipped:", incErr);
        }
      }
    } catch (dbErr) {
      console.warn("DB save skipped (Supabase not configured):", dbErr);
    }

    return NextResponse.json({
      success: true,
      program,
      programId,
      demo: false,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("Program generation error:", message);
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
