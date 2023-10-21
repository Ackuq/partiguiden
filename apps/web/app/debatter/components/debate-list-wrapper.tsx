import Filter from "@components/filter";
import { FilterContextProvider } from "@components/filter/filter-context";
import initialFilterToggles from "@components/filter/initial-filter-toggles";
import getDebates from "@lib/api/debates/get-debates";

import DebateList from "./debate-list";

interface Props {
  search?: string;
  committees: string[];
  page: number;
}

export default async function DebateListWrapper({
  search,
  page,
  committees,
}: Props) {
  const debates = await getDebates({ search, page, committees });
  const filterToggles = initialFilterToggles(committees);

  return (
    <div className="mx-4 mb-4 block gap-2 2xl:container sm:flex 2xl:mx-auto">
      <FilterContextProvider
        initialSearch={search}
        initialToggles={filterToggles}
      >
        <DebateList currentPage={page} debates={debates} />
        <Filter />
      </FilterContextProvider>
    </div>
  );
}
