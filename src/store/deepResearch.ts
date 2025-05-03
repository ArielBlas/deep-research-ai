import { create } from "zustand";

interface DeepResearchStore {
  topic: string;
  questions: string[];
}

interface DeepResearchActions {
  setTopic: (topic: string) => void;
  setQuestions: (questions: string[]) => void;
}

export const useDeepResearchStore = create<
  DeepResearchStore & DeepResearchActions
>((set) => ({
  topic: "",
  questions: [],
  setTopic: (topic: string) => set({ topic }),
  setQuestions: (questions: string[]) => set({ questions }),
}));
