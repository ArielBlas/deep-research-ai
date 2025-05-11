import { z } from "zod";
import { ResearchFindings, ResearchState, SearchResult } from "./types";
import {
  EXTRACTION_SYSTEM_PROMPT,
  getExtractionPrompt,
  getPlanningPrompt,
  PLANNING_SYSTEM_PROMPT,
} from "./prompts";
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
      numResults: 1,
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

export async function extractContent(
  content: string,
  url: string,
  researchState: ResearchState
) {
  const result = await callModel(
    {
      model: "openai/gpt-4o-mini",
      prompt: getExtractionPrompt(
        content,
        researchState.topic,
        researchState.clarificationsText
      ),
      system: EXTRACTION_SYSTEM_PROMPT,
      schema: z.object({
        summary: z.string().describe("A comprehensive summary of the content"),
      }),
    },
    researchState
  );

  return {
    url,
    summary: (result as any).summary,
  };
}

export async function processSearchResults(
  searchResults: SearchResult[],
  researchState: ResearchState
): Promise<ResearchFindings[]> {
  const extractionPromises = searchResults.map((result) =>
    extractContent(result.content, result.url, researchState)
  );
  const extractionResults = await Promise.allSettled(extractionPromises);

  type ExtractionResult = {
    url: string;
    summary: string;
  };

  const newFindings = extractionResults
    .filter(
      (result): result is PromiseFulfilledResult<ExtractionResult> =>
        result.status === "fulfilled" &&
        result.value !== null &&
        result.value !== undefined
    )
    .map((result) => {
      const { summary, url } = result.value;

      return {
        summary,
        source: url,
      };
    });

  return newFindings;
}
