import { ResearchFindings } from "./types";

export const combineFindings = (findings: ResearchFindings[]): string => {
  return findings
    .map((finding) => `${finding.summary}\n\n Source: ${finding.source}`)
    .join("\n\n---\n\n");
};
