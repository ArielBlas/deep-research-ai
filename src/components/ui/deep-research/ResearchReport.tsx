"use client";
import { useDeepResearchStore } from "@/store/deepResearch";
import React from "react";
import { Card } from "../card";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

const ResearchReport = () => {
  const { report, isCompleted, isLoading, topic } = useDeepResearchStore();

  if (!report) return;

  return (
    <Card className="max-w-[90vw] xl:max-w-[60vw] relative px-4 py-6 rounded-xl border-black/10 border-solid shadow-none p-6">
      <div className="prose prose-sm md:prose-base max-w-none">
        <Markdown remarkPlugins={[remarkGfm]}>
          {report.split("<report>")[1].split("</report>")[0]}
        </Markdown>
      </div>
    </Card>
  );
};

export default ResearchReport;
