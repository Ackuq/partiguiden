import { Card } from "@components/common/card";
import Container from "@components/common/container";
import PageTitle from "@components/common/page-title";
import { ChartBarIcon } from "@heroicons/react/24/solid";
import MonthPoll from "./month-poll";
import getPolls from "@lib/api/polls/get-polls";
import HistoricPolls from "./historic-polls";
import BlockBuilder from "./block-builder";
import BlockStatistics from "./block-statistics";
import dynamic from "next/dynamic";

const ResponsiveAd = dynamic(() => import("@components/ads/responsive-ad"), {
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
