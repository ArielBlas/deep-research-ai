import { generateSearchQueries } from "./research-functions";
import { ResearchState } from "./types";

export async function deepResearch(
  researchState: ResearchState,
  dataStream: any
) {
  const initialQueries = await generateSearchQueries(researchState);
}
