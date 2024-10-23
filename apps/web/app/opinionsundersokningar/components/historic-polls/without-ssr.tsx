"use client";

import dynamic from "next/dynamic";

const HistoricPolls = dynamic(() => import("./historic-polls"), {
  ssr: false,
  loading: HistoricPollsLoading,
});

function HistoricPollsLoading() {
  return (
    <div
      role="status"
      className="h-[30rem] w-full animate-pulse bg-slate-200 dark:bg-slate-900"
    />
  );
}

export default HistoricPolls;
