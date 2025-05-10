import { z } from "zod";
import { ResearchState, SearchResult } from "./types";
import { getPlanningPrompt, PLANNING_SYSTEM_PROMPT } from "./prompts";
import { callModel } from "./model-caller";
import { exa } from "./service";

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

export async function search(
  query: string,
  ResearchState: ResearchState
): Promise<SearchResult[]> {
  try {
    const searchResult = await exa.searchAndContents(query, {
      type: "keyword",
      numResults: 3,
      startPublishedDate: new Date(
        Date.now() - 365 * 24 * 60 * 60 * 1000
      ).toISOString(), // 1 year ago
      endPublishedDate: new Date().toISOString(),
      startCrawlDate: new Date(
        Date.now() - 365 * 24 * 60 * 60 * 1000
      ).toISOString(), // 1 year ago
      endCrawlDate: new Date().toISOString(),
      excludeDomains: ["https://youtube.com"],
      text: {
        maxCharacters: 20000,
      },
    });

    const filteredResults = searchResult.results
      .filter((r) => r.title && r.text !== undefined)
      .map((r) => ({
        title: r.title || "",
        url: r.url || "",
        content: r.text || "",
      }));

    ResearchState.completedSteps++;

    return filteredResults;
  } catch (error) {
    console.error("error: ", error);
  }
}
