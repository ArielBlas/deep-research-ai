import { createDataStreamResponse } from "ai";
import { ResearchState } from "./types";
import { deepResearch } from "./main";

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const lastMessageContent = messages[messages.length - 1].content;

    const parsed = JSON.parse(lastMessageContent);

    const topic = parsed.topic;
    const clarifications = parsed.clarifications;

    console.log("Topic:", topic);
    console.log("Clarifications:", clarifications);

    return createDataStreamResponse({
      async execute(dataStream) {
        // Write data
        // dataStream.writeData({ value: "Hello" });

        const researchState: ResearchState = {
          topic: topic,
          completedSteps: 0,
          tokenUsed: 0,
          findings: [],
          proccessedUrl: new Set(),
          clarificationsText: JSON.stringify(clarifications),
        };

        await deepResearch(researchState, dataStream);
      },
      // onError: error => `Custom error: ${error.message}`,
    });
  } catch (error) {
    return new Response(
      JSON.stringify({
        success: false,
        error:
          error instanceof Error ? error.message : "Invalid message format!",
      }),
      {
        status: 500,
      }
    );
  }
}
