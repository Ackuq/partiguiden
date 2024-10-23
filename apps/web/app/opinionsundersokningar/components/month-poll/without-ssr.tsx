"use client";

import dynamic from "next/dynamic";
import { twMerge } from "tailwind-merge";

const MonthPoll = dynamic(() => import("./month-poll"), {
  loading: MonthPollLoading,
  ssr: false,
});

const LOADING_BARS = [
  "h-80",
  "h-64",
  "h-60",
  "h-72",
  "h-48",
  "h-96",
  "h-32",
  "h-56",
];

function MonthPollLoading() {
  return (
    <div role="status" className="ml-[40px] flex h-96 items-end sm:h-[30rem]">
      {LOADING_BARS.map((height) => (
        <div
          key={height}
          className={twMerge(
            "mx-2 flex-1 animate-pulse bg-slate-200 dark:bg-slate-900",
            height,
          )}
        />
      ))}
    </div>
  );
}

export default MonthPoll;
