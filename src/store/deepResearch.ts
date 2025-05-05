import { create } from "zustand";

interface DeepResearchStore {
  topic: string;
  questions: string[];
  answers: string[];
  currentQuestion: number;
  isCompleted: boolean;
  isLoading: boolean;
}

interface DeepResearchActions {
  setTopic: (topic: string) => void;
  setQuestions: (questions: string[]) => void;
  setAnswers: (answers: string[]) => void;
  setCurrentQuestion: (currentQuestion: number) => void;
  setIsCompleted: (isCompleted: boolean) => void;
  setIsLoading: (isLoading: boolean) => void;
}

const initialState: DeepResearchStore = {
  topic: "",
  questions: [],
  answers: [],
  currentQuestion: 0,
  isCompleted: false,
  isLoading: false,
};

export const useDeepResearchStore = create<
  DeepResearchStore & DeepResearchActions
>((set) => ({
  ...initialState,
  setTopic: (topic: string) => set({ topic }),
  setQuestions: (questions: string[]) => set({ questions }),
  setAnswers: (answers: string[]) => set({ answers }),
  setCurrentQuestion: (currentQuestion: number) => set({ currentQuestion }),
  setIsCompleted: (isCompleted: boolean) => set({ isCompleted }),
  setIsLoading: (isLoading: boolean) => set({ isLoading }),
}));
