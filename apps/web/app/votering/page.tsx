import PageTitle from "@components/common/page-title";
import type { FilterToggle } from "@components/filter/filter-context";
import { FilterContextProvider } from "@components/filter/filter-context";
import { ScaleIcon } from "@heroicons/react/24/solid";
import { getVotes } from "@lib/api/vote/get-votes";
import {
  parseNumberSearchParam,
  parseStringArraySearchParam,
  parseStringSearchParam,
} from "@lib/utils/search-params";
import VoteList from "./vote-list";
import Filter from "@components/filter";
import { Committee, committeeInfo } from "@lib/committes";

export const metadata = {
  title: "Voteringar | Partiguiden",
  description: "Hur har partierna röstat i voteringar? Ta reda på det här",
};

function initialFilterToggles(committees: string[]): FilterToggle<Committee> {
  return Object.values(Committee).reduce(
    (prev, committee) => ({
      ...prev,
      [committee]: {
        title: committeeInfo[committee].desc,
        value: committees.includes(committee),
      },
    }),
    {} as FilterToggle<Committee>,
  );
}

interface Props {
  searchParams: {
    sok?: string | string[];
    sida?: string | string[];
    utskott?: string | string[];
  };
}

export default async function Votes({ searchParams }: Props) {
  const page = parseNumberSearchParam(searchParams.sida) ?? 1;
  const search = parseStringSearchParam(searchParams.sok);
  const committees = parseStringArraySearchParam(searchParams.utskott);
  const votes = await getVotes({ search, page, committees });

  const filterToggles = initialFilterToggles(committees);

  return (
    <main>
      <PageTitle Icon={ScaleIcon}>Voteringar</PageTitle>

      <div className="mx-4 mb-4 flex gap-2 2xl:container 2xl:mx-auto">
        <FilterContextProvider initialToggles={filterToggles}>
          <VoteList currentPage={page} votes={votes} />
          <Filter />
        </FilterContextProvider>
      </div>
    </main>
  );
}
