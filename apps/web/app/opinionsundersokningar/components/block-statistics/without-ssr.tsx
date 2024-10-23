"use client";

import dynamic from "next/dynamic";

const BlockStatistics = dynamic(() => import("./block-statistics"), {
  ssr: false,
  loading: BlockStatisticsLoading,
});

function BlockStatisticsLoading() {
  return (
    <div
      role="status"
      className="h-52 w-full animate-pulse bg-slate-200 dark:bg-slate-900 sm:h-80"
    />
  );
}

export default BlockStatistics;
