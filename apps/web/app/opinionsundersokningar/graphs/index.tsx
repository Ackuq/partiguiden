"use client";

import dynamic from "next/dynamic";
import { twMerge } from "tailwind-merge";

import { ResponsiveAd } from "@components/ads";
import { Card } from "@components/common/card";
import type {
  AveragePoll,
  BlocksAverage,
  MonthlyAverage,
} from "@lib/api/polls/types";

interface Props {
  currentMonthAverage: AveragePoll;
  historicPolls: MonthlyAverage;
  blockAverage: BlocksAverage;
}

export default function Graphs({
  currentMonthAverage,
  historicPolls,
  blockAverage,
}: Props) {
  return (
    <>
      <Card>
        <h4 className="mb-3 text-center text-xl sm:text-2xl">
          Senaste mätningar
        </h4>
        <MonthPoll currentMonthAverage={currentMonthAverage} />
      </Card>
      <ResponsiveAd />
      <Card>
        <h4 className="mb-3 text-center text-xl sm:text-2xl">
          Historiskt genomsnitt (senaste 4 åren)
        </h4>
        <HistoricPolls historicPolls={historicPolls} />
      </Card>
      <Card>
        <h4 className="mb-3 text-center text-xl sm:text-2xl">
          Bygg din egna regering
        </h4>
        <BlockBuilder currentMonthAverage={currentMonthAverage} />
      </Card>
      <Card className="overflow-visible">
        <h4 className="mb-3 text-center text-xl sm:text-2xl">
          Blockskillnad (senaste mätningar)
        </h4>
        <BlockStatistics
          currentMonthAverage={currentMonthAverage}
          blockAverage={blockAverage}
        />
      </Card>

      <ResponsiveAd />
    </>
  );
}

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

const BlockStatistics = dynamic(() => import("./block-statistics"), {
  ssr: false,
  loading: () => (
    <div
      role="status"
      className="h-52 w-full animate-pulse bg-slate-200 dark:bg-slate-900 sm:h-80"
    />
  ),
});

const BlockBuilder = dynamic(() => import("./block-builder"), {
  ssr: false,
  loading: () => (
    <div
      role="status"
      className="h-[43rem] w-full animate-pulse bg-slate-200 dark:bg-slate-900"
    />
  ),
});

const HistoricPolls = dynamic(() => import("./historic-polls"), {
  ssr: false,
  loading: () => (
    <div
      role="status"
      className="h-[30rem] w-full animate-pulse bg-slate-200 dark:bg-slate-900"
    />
  ),
});

const MonthPoll = dynamic(() => import("./month-poll"), {
  loading: () => (
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
  ),
  ssr: false,
});
