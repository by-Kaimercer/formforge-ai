import Groq from "groq-sdk";
import { SYSTEM_PROMPT_GENERATE, SYSTEM_PROMPT_CHAT } from "./rag";

const groqApiKey = process.env.GROQ_API_KEY || "";
const groq = groqApiKey ? new Groq({ apiKey: groqApiKey }) : null;

export async function generateProgram(userProfileContext: string): Promise<string> {
  if (!groq) {
    throw new Error("GROQ_API_KEY not configured — use demo mode");
  }
  const completion = await groq.chat.completions.create({
    model: "llama-3.1-70b-versatile",
    messages: [
      { role: "system", content: SYSTEM_PROMPT_GENERATE },
      { role: "user", content: `Here is the user profile:\n${userProfileContext}\n\nGenerate their complete training program. Output ONLY valid JSON matching the schema.` },
    ],
    temperature: 0.7,
    max_tokens: 8000,
    response_format: { type: "json_object" },
  });
  return completion.choices[0]?.message?.content || "{}";
}

export async function chatWithCoach(
  messages: { role: "user" | "assistant"; content: string }[],
  profileContext: string,
  programContext: string
): Promise<string> {
  if (!groq) {
    throw new Error("GROQ_API_KEY not configured — use demo mode");
  }
  const systemMessage = `${SYSTEM_PROMPT_CHAT}\n\n--- USER PROFILE ---\n${profileContext}\n\n--- CURRENT PROGRAM ---\n${programContext}`;
  const completion = await groq.chat.completions.create({
    model: "llama-3.1-70b-versatile",
    messages: [
      { role: "system", content: systemMessage },
      ...messages,
    ],
    temperature: 0.7,
    max_tokens: 2000,
  });
  return completion.choices[0]?.message?.content || "";
}

export async function getExerciseSubstitutes(
  exerciseName: string,
  muscleGroup: string,
  equipment: string,
  injuries: string[]
): Promise<string> {
  if (!groq) {
    return JSON.stringify([
      { name: "Dumbbell Alternative", reason: "Similar muscle activation with dumbbells" },
      { name: "Machine Alternative", reason: "Guided movement path, joint-friendly" },
      { name: "Cable Alternative", reason: "Constant tension throughout ROM" },
    ]);
  }
  const completion = await groq.chat.completions.create({
    model: "llama-3.1-70b-versatile",
    messages: [
      { role: "system", content: "You are a strength coach. Output ONLY valid JSON array." },
      { role: "user", content: `Suggest 3 alternatives to "${exerciseName}" (targets: ${muscleGroup}). Equipment: ${equipment}. Injuries: ${injuries.join(", ") || "none"}. Format: [{"name": string, "reason": string}]` },
    ],
    temperature: 0.5,
    max_tokens: 500,
    response_format: { type: "json_object" },
  });
  return completion.choices[0]?.message?.content || "[]";
}
