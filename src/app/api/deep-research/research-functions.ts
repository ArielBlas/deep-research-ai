import { ResearchState } from "./types";
import { callModel } from "./model-caller";
import { z } from "zod";

export async function generateSearchQueries(researchState: ResearchState) {
  const result = await callModel({
    model: "openai/gpt-4oturbo",
    prompt,
    system,
    schema: z.object({
      searchQueries: z
        .array(z.string())
        .describe(
          "The search queries that can be used to find the most relevant content which can be used to write the comprehensive report on the given topic. (max 3 queries)"
        ),
    }),
  });
}
