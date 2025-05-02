import { NextResponse } from "next/server";
import { generateText } from "ai";
import { createOpenRouter } from "@openrouter/ai-sdk-provider";

const openrouter = createOpenRouter({
  apiKey: process.env.OPENROUTER_API_KEY || "",
});

const clarifyResearchGoals = async (topic: string) => {
  const prompt = `
  Given the research topic <topic>${topic}</topic>, generate 2-4 clarifying questions to help narrow down the research scope. Focus on identifying:
  - Specific aspects of interest
  - Required depth/complexity level
  - Any particular perspective or excluded sources
  `;
  try {
    const { text } = await generateText({
      model: openrouter("openai/chatgpt-4o-latest"),
      prompt,
    });
    return text;
  } catch (error) {
    console.error("Error while generating questions:", error);
  }
};

export async function POST(req: Request) {
  const { topic } = await req.json();
  console.log("Topic :", topic);

  try {
    const questions = await clarifyResearchGoals(topic);
    console.log("Questions:", questions);
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Error while generating questions:", error);
    return NextResponse.json(
      { success: false, error: "Failed to generate questions" },
      { status: 500 }
    );
  }
}
