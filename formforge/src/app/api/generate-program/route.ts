import { NextResponse } from "next/server";
import { MOCK_PROGRAM } from "@/lib/mock-data";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const groqKey = process.env.GROQ_API_KEY;

    if (!groqKey) {
      // Demo mode: return mock program after a delay
      await new Promise((r) => setTimeout(r, 3000));
      return NextResponse.json({
        success: true,
        program: MOCK_PROGRAM,
        programId: "demo",
        demo: true,
      });
    }

    // Real mode: call Groq
    const { generateProgram } = await import("@/lib/groq");
    const { buildProfileContext } = await import("@/lib/rag");
    const profileContext = buildProfileContext(body.profile);
    const raw = await generateProgram(profileContext);
    const program = JSON.parse(raw);

    // In production, save to Supabase here
    return NextResponse.json({
      success: true,
      program,
      programId: `prog_${Date.now()}`,
      demo: false,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("Program generation error:", message);
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
