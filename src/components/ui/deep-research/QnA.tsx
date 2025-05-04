"use client";
import { useDeepResearchStore } from "@/store/deepResearch";
import React from "react";
import QuestionForm from "./QuestionForm";

const QnA = () => {
  const { questions } = useDeepResearchStore();

  if (questions.length === 0) return null;

  return (
    <div className="flex gap-4 w-full flex-col items-center mb-16">
      <QuestionForm />
    </div>
  );
};

export default QnA;
