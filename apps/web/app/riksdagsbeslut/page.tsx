import PageTitle from "@components/common/page-title";
import Filter from "@components/filter";
import { FilterContextProvider } from "@components/filter/filter-context";
import { DocumentCheckIcon } from "@heroicons/react/24/solid";
import getDecisions from "@lib/api/decisions/get-decisions";
import {
  parseNumberSearchParam,
  parseStringArraySearchParam,
  parseStringSearchParam,
} from "@lib/utils/search-params";
import DecisionList from "./decision-list";
import initialFilterToggles from "@components/filter/initial-filter-toggles";
import sleep from "@lib/utils/sleep";

interface Props {
  searchParams: {
    sok?: string | string[];
    sida?: string | string[];
    utskott?: string | string[];
  };
}

export default async function Decisions({ searchParams }: Props) {
  const page = parseNumberSearchParam(searchParams.sida) ?? 1;
  const search = parseStringSearchParam(searchParams.sok);
  const committees = parseStringArraySearchParam(searchParams.utskott);
  const decisions = await getDecisions({ search, page, committees });

  const filterToggles = initialFilterToggles(committees);
  await sleep(1000);
  return (
    <main>
      <PageTitle Icon={DocumentCheckIcon}>Riksdagsbesult</PageTitle>
      <div className="mx-4 mb-4 flex gap-2 2xl:container 2xl:mx-auto">
        <FilterContextProvider
          initialSearch={search}
          initialToggles={filterToggles}
        >
          <DecisionList currentPage={page} decisions={decisions} />
          <Filter />
        </FilterContextProvider>
      </div>
    </main>
  );
}

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Riksdagsbeslut | Partiguiden",
  description:
    "Vad tar riksdagen för beslut? Här hittar du en sammanfattning på de senaste besluten som tas upp i riksdagen.",
};
