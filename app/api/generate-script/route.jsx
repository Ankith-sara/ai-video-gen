import { generateScript } from "@/configs/AiModel";
import { NextResponse } from "next/server";

// Default prompt template for standard use
const SCRIPT_PROMPT = `write two different scripts for a 30-second video on the Topic: {topic}.
Give the response in JSON format using this schema:
{
  "scripts": [
    { "content": "AI-generated script 1" },
    { "content": "AI-generated script 2" }
  ]
}`;

export async function POST(req) {
  try {
    const { topic, customPrompt } = await req.json();

    // Choose which prompt to use: custom or default topic-based
    const PROMPT = customPrompt
      ? customPrompt
      : SCRIPT_PROMPT.replace("{topic}", topic);

    const result = await generateScript.sendMessage(PROMPT);
    const respText = result?.response?.text();

    let parsed = JSON.parse(respText);

    // Add a blank custom script slot
    parsed.scripts.push({
      content: "",
      custom: true
    });

    return NextResponse.json(parsed);
  } catch (error) {
    console.error("Script generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate scripts" },
      { status: 500 }
    );
  }
}
