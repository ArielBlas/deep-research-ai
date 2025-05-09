import { z } from "zod";
import { ResearchState } from "./types";
import { getPlanningPrompt, PLANNING_SYSTEM_PROMPT } from "./prompts";
import { callModel } from "./model-caller";

export async function generateSearchQueries(researchState: ResearchState) {
  const result = await callModel(
    {
      model: "openai/gpt-4oturbo",
      prompt: getPlanningPrompt(
        researchState.topic,
        researchState.clarificationsText
      ),
      system: PLANNING_SYSTEM_PROMPT,
      schema: z.object({
        searchQueries: z
          .array(z.string())
          .describe(
            "The search queries that can be used to find the most relevant content which can be used to write the comprehensive report on the given topic. (max 3 queries)"
          ),
      }),
    },
    researchState
  );

  return result;
}
