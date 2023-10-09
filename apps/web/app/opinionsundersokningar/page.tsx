import { ResponsiveAd } from "@components/ads";
import { Card } from "@components/common/card";
import Container from "@components/common/container";
import PageTitle from "@components/common/page-title";
import { ChartBarIcon } from "@heroicons/react/24/solid";
import getPolls from "@lib/api/polls/get-polls";
import dynamic from "next/dynamic";
import { twMerge } from "tailwind-merge";

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

export const metadata = {
  title: "Opinionsundersökningar | Partiguiden",
  description:
    "Vad tar Sveriges partier för ståndpunkter i sakfrågor? På Partiguiden kan du hitta och jämföra vad partierns åsikter för att hitta det parti du sympatiserar mest med.",
};

export default async function PollPage() {
  const { currentMonthAverage, historicPolls, blockAverage } = await getPolls();

  return (
    <main>
      <PageTitle Icon={ChartBarIcon}>Opinionsundersökningar</PageTitle>

      <Container className="flex flex-col gap-4">
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
      </Container>
    </main>
  );
}
