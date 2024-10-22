"use client";

import dynamic from "next/dynamic";

const TotalVote = dynamic(() => import("./total-vote"), {
  ssr: false,
  loading: () => (
    <div role="status" className="h-[6.5rem] sm:h-24">
      <div className="h-10 bg-slate-200 dark:bg-slate-900" />
      <div className="mt-2 h-6 bg-slate-200 dark:bg-slate-900"></div>
    </div>
  ),
});

export default TotalVote;
