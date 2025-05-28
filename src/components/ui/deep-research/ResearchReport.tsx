"use client";
import { useDeepResearchStore } from "@/store/deepResearch";
import React, { ComponentPropsWithRef } from "react";
import { Card } from "../card";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  Prism as SyntaxHighlighter,
  SyntaxHighlighterProps,
} from "react-syntax-highlighter";
import { nightOwl } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Download, Loader2 } from "lucide-react";
import { Button } from "../button";

type CodeProps = ComponentPropsWithRef<"code"> & {
  inline?: boolean;
};

const ResearchReport = () => {
  const { report, isCompleted, isLoading, topic } = useDeepResearchStore();

  const handleMarkdownDownload = () => {
    const content = report.split("<report>")[1].split("</report>")[0];
    const blob = new Blob([content], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${topic}-research-report.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (!report && isLoading) {
    return (
      <Card className="p-4 max-w-[50vw] rounded-xl px-4 py-2 shadow-none bg-white/60 backdrop-blur-sm border border-black/10 border-solid">
        <div className="flex flex-col items-center justify-center space-y-4 p-8">
          <Loader2 className="w-8 h-8 animate-spin" />
          <p className="text-sm text-muted-foreground">
            Researching your topic...
          </p>
        </div>
      </Card>
    );
  }

  if (!report) return;

  if (!isCompleted) return;

  return (
    <Card
      className="max-w-[90vw] xl:max-w-[60vw] relative px-4 py-6 rounded-xl border-black/10 border-solid shadow-none p-6
     bg-white/60 backdrop-blur-sm border
    "
    >
      <div className="flex justify-end gap-2 mb-4 absolute top-4 right-4">
        <Button
          size="sm"
          className="flex items-center gap-2 rounded"
          onClick={handleMarkdownDownload}
        >
          <Download className="w-4 h-4" /> Download
        </Button>
      </div>
      <div className="prose prose-sm md:prose-base max-w-none prose-pre:p-2">
        <Markdown
          remarkPlugins={[remarkGfm]}
          components={{
            code({ className, children, inline, ...props }: CodeProps) {
              const match = /language-(\w+)/.exec(className || "");
              const language = match ? match[1] : "";

              if (!inline && language) {
                const syntaxHighlighterProps: SyntaxHighlighterProps = {
                  style: nightOwl,
                  language,
                  preTag: "div",
                  children: String(children),
                };
                return <SyntaxHighlighter {...syntaxHighlighterProps} />;
              }

              return (
                <code className={className} {...props}>
                  {children}
                </code>
              );
            },
          }}
        >
          {report.split("<report>")[1].split("</report>")[0]}
        </Markdown>
      </div>
    </Card>
  );
};

export default ResearchReport;
