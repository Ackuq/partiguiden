import Filter from "@components/filter";
import { FilterContextProvider } from "@components/filter/filter-context";
import initialFilterToggles from "@components/filter/initial-filter-toggles";
import { getVotes } from "@lib/api/vote/get-votes";

import VoteList from "./vote-list";

interface Props {
  search?: string;
  committees: string[];
  page: number;
}

export default async function VoteListWrapper({
  search,
  page,
  committees,
}: Props) {
  const votes = await getVotes({ search, page, committees });

  const filterToggles = initialFilterToggles(committees);

  return (
    <div className="mx-4 mb-4 block gap-2 2xl:container sm:flex 2xl:mx-auto">
      <FilterContextProvider
        initialSearch={search}
        initialToggles={filterToggles}
      >
        <VoteList currentPage={page} votes={votes} />
        <Filter />
      </FilterContextProvider>
    </div>
  );
}
