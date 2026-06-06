import { SYSTEM_PROMPT_GENERATE, SYSTEM_PROMPT_CHAT } from "./rag";

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY || "";
const OPENROUTER_BASE_URL = "https://openrouter.ai/api/v1";
const MODEL = "openai/gpt-oss-120b:free";

async function openRouterChat(
  messages: { role: string; content: string }[],
  options: { temperature?: number; max_tokens?: number; json?: boolean } = {}
): Promise<string> {
  if (!OPENROUTER_API_KEY) {
    throw new Error("OPENROUTER_API_KEY not configured — use demo mode");
  }

  const body: Record<string, unknown> = {
    model: MODEL,
    messages,
    temperature: options.temperature ?? 0.7,
    max_tokens: options.max_tokens ?? 2000,
  };

  if (options.json) {
    body.response_format = { type: "json_object" };
  }

  const res = await fetch(`${OPENROUTER_BASE_URL}/chat/completions`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
      "Content-Type": "application/json",
      "HTTP-Referer": process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
      "X-Title": "FormForge",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`OpenRouter error ${res.status}: ${err}`);
  }

  const data = await res.json();
  return data.choices?.[0]?.message?.content || "";
}

export async function generateProgram(userProfileContext: string): Promise<string> {
  return openRouterChat(
    [
      { role: "system", content: SYSTEM_PROMPT_GENERATE },
      {
        role: "user",
        content: `Here is the user profile:\n${userProfileContext}\n\nGenerate their complete training program. Output ONLY valid JSON matching the schema.`,
      },
    ],
    { temperature: 0.7, max_tokens: 8000, json: true }
  );
}

export async function chatWithCoach(
  messages: { role: "user" | "assistant"; content: string }[],
  profileContext: string,
  programContext: string
): Promise<string> {
  const systemMessage = `${SYSTEM_PROMPT_CHAT}\n\n--- USER PROFILE ---\n${profileContext}\n\n--- CURRENT PROGRAM ---\n${programContext}`;
  return openRouterChat(
    [{ role: "system", content: systemMessage }, ...messages],
    { temperature: 0.7, max_tokens: 2000 }
  );
}

export async function getExerciseSubstitutes(
  exerciseName: string,
  muscleGroup: string,
  equipment: string,
  injuries: string[]
): Promise<string> {
  if (!OPENROUTER_API_KEY) {
    return JSON.stringify([
      { name: "Dumbbell Alternative", reason: "Similar muscle activation with dumbbells" },
      { name: "Machine Alternative", reason: "Guided movement path, joint-friendly" },
      { name: "Cable Alternative", reason: "Constant tension throughout ROM" },
    ]);
  }
  return openRouterChat(
    [
      { role: "system", content: "You are a strength coach. Output ONLY valid JSON array." },
      {
        role: "user",
        content: `Suggest 3 alternatives to "${exerciseName}" (targets: ${muscleGroup}). Equipment: ${equipment}. Injuries: ${injuries.join(", ") || "none"}. Format: [{"name": string, "reason": string}]`,
      },
    ],
    { temperature: 0.5, max_tokens: 500, json: true }
  );
}
