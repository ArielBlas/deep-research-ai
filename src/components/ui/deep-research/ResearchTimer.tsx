"use client";
import { useDeepResearchStore } from "@/store/deepResearch";
import React, { useEffect, useState } from "react";
import { Card } from "../card";

const ResearchTimer = () => {
  const { report, isCompleted, activities } = useDeepResearchStore();
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    if (report.length > 10) return;
    const startTime = Date.now();
    const timer = setInterval(() => {
      setElapsedTime(Date.now() - startTime);
    }, 16);

    return () => clearInterval(timer);
  }, [report, isCompleted]);

  if (activities.length <= 0) return;

  const seconds = Math.floor(elapsedTime / 1000);
  const miliseconds = elapsedTime % 1000;

  return (
    <Card className="p-2 bg-white/60 border border-black/10 shadow-none rounded">
      <p className="text-sm text-muted-foreground">
        Time elapsed:{" "}
        <span>
          {seconds > 60
            ? `${Math.floor(seconds / 60)}m ${
                seconds % 60 > 0 ? `${(seconds % 60).toString()}` : ""
              }`
            : `${seconds}.${miliseconds.toString()}s`}
        </span>
      </p>
    </Card>
  );
};

export default ResearchTimer;
