/* eslint-disable @typescript-eslint/no-explicit-any */
import { Activity, ResearchState } from "./types";

export const createActivityTracker = (
  dataStream: any,
  researchState: ResearchState
) => {
  return {
    add: (activity: Activity) => {
      dataStream.writeDate({
        type: "activity",
        content: {
          ...activity,
          timestamp: Date.now(),
          completedSteps: researchState.completedSteps,
          tokenUsed: researchState.tokenUsed,
        },
      });
    },
  };
};
