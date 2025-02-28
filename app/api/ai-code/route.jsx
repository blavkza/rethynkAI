import { GenAiCode } from "@/configs/AiModel";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { prompt } = await req.json();

  try {
    const result = await GenAiCode.sendMessage(prompt);
    const AiResponse = result.response.text();

    // Attempt to parse as JSON
    try {
      const parsedResponse = JSON.parse(AiResponse);
      return NextResponse.json(parsedResponse);
    } catch (parseError) {
      // If parsing fails, return the response as plain text
      return NextResponse.json({ response: AiResponse });
    }
  } catch (error) {
    console.error("Error in /api/ai-code:", error);
    return NextResponse.json(
      { error: "Failed to generate AI code", details: error.message },
      { status: 500 }
    );
  }
}
