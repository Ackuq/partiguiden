import { FilterContextProvider } from "@components/filter/filter-context";
import VoteList from "./vote-list";
import Filter from "@components/filter";
import initialFilterToggles from "@components/filter/initial-filter-toggles";
import { getVotes } from "@lib/api/vote/get-votes";

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
    <div className="mx-4 mb-4 flex gap-2 2xl:container 2xl:mx-auto">
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
