import { generateSearchQueries, search } from "./research-functions";
import { ResearchState } from "./types";

export async function deepResearch(
  researchState: ResearchState,
  dataStream: any
) {
  const initialQueries = await generateSearchQueries(researchState);
  let currentQueries = (initialQueries as any).searchQueries;

  while (currentQueries && currentQueries.length > 0) {
    const searchResults = currentQueries.map((query: string) =>
      search(query, researchState)
    );
    const searchResultsResponses = await Promise.allSettled(searchResults);

    const allSearchResults = searchResultsResponses
      .filter(
        (result) => result.status === "fulfilled" && result.value.length > 0
      )
      .map((result) => result.value)
      .flat();

    console.log("allSearchResults", allSearchResults);
  }

  return initialQueries;
}
