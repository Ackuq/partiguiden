import { ChartBarIcon } from "@heroicons/react/24/solid";

import Container from "@components/common/container";
import PageTitle from "@components/common/page-title";
import getPolls from "@lib/api/polls/get-polls";

import Graphs from "./graphs";

export const metadata = {
  title: "Opinionsundersökningar | Partiguiden",
  description:
    "Vad tar Sveriges partier för ståndpunkter i sakfrågor? På Partiguiden kan du hitta och jämföra vad partierns åsikter för att hitta det parti du sympatiserar mest med.",
};

// Revalidate data at most once per day (60 * 60 * 24)s
export const revalidate = 86400;

export default async function PollPage() {
  const { currentMonthAverage, historicPolls, blockAverage } = await getPolls();

  return (
    <main>
      <PageTitle Icon={ChartBarIcon}>Opinionsundersökningar</PageTitle>

      <Container className="flex flex-col gap-4">
        <Graphs
          currentMonthAverage={currentMonthAverage}
          historicPolls={historicPolls}
          blockAverage={blockAverage}
        />
      </Container>
    </main>
  );
}
