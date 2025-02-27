import { GenAiCode } from "@/configs/AiModel";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { prompt } = await req.json();

  try {
    const result = await GenAiCode.sendMessage(prompt);
    const AiResponse = result.response.text();

    return NextResponse.json(JSON.parse(AiResponse));
  } catch (error) {
    return NextResponse.json({ error: AiResponse });
  }
}
