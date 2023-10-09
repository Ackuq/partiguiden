import { FilterContextProvider } from "@components/filter/filter-context";
import Filter from "@components/filter";
import initialFilterToggles from "@components/filter/initial-filter-toggles";
import DebateList from "./debate-list";
import getDebates from "@lib/api/debates/get-debates";

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
    <div className="mx-4 mb-4 flex gap-2 2xl:container 2xl:mx-auto">
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
