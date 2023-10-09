import { FilterContextProvider } from "@components/filter/filter-context";
import DecisionList from "./decision-list";
import Filter from "@components/filter";
import getDecisions from "@lib/api/decisions/get-decisions";
import initialFilterToggles from "@components/filter/initial-filter-toggles";

interface Props {
  search?: string;
  committees: string[];
  page: number;
}

export default async function DecisionListWrapper({
  search,
  page,
  committees,
}: Props) {
  const decisions = await getDecisions({ search, page, committees });
  const filterToggles = initialFilterToggles(committees);

  return (
    <div className="mx-4 mb-4 flex gap-2 2xl:container 2xl:mx-auto">
      <FilterContextProvider
        initialSearch={search}
        initialToggles={filterToggles}
      >
        <DecisionList currentPage={page} decisions={decisions} />
        <Filter />
      </FilterContextProvider>
    </div>
  );
}
