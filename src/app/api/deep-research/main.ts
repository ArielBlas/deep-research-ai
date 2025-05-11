import {
  generateSearchQueries,
  processSearchResults,
  search,
} from "./research-functions";
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

    const newFindings = await processSearchResults(
      allSearchResults,
      researchState
    );

    researchState.findings = [...researchState.findings, ...newFindings];

    console.log(newFindings);

    const currentQueries = [];
  }

  return initialQueries;
}
