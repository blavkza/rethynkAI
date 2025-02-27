import { GenAiCode } from "@/configs/AiModel";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { prompt } = await req.json();

  try {
    const result = await GenAiCode.sendMessage(prompt);
    const AiResponse = result.response.text();

    // Ensure AiResponse is valid JSON before parsing
    return NextResponse.json(JSON.parse(AiResponse));
  } catch (error) {
    console.error("Error in /api/ai-code:", error);
    return NextResponse.json(
      { error: "Failed to generate AI code" },
      { status: 500 }
    );
  }
}
