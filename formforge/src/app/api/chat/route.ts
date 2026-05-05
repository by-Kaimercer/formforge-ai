import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const groqKey = process.env.GROQ_API_KEY;

    if (!groqKey) {
      // Demo mode
      await new Promise((r) => setTimeout(r, 1000));
      return NextResponse.json({
        message: `Great question! Since we're in demo mode, I'll give you a general answer: ${body.messages?.[body.messages.length - 1]?.content ? "Based on your training profile, I'd recommend focusing on progressive overload and ensuring adequate recovery between sessions. Your current program is well-structured for your experience level." : "I'm your AI coach — ask me anything about your program!"}`,
      });
    }

    const { chatWithCoach } = await import("@/lib/groq");
    const { buildProfileContext, buildProgramContext } = await import("@/lib/rag");
    const profileCtx = buildProfileContext(body.profile);
    const programCtx = body.program ? buildProgramContext(body.program) : "No program loaded";
    const reply = await chatWithCoach(body.messages, profileCtx, programCtx);
    return NextResponse.json({ message: reply });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
