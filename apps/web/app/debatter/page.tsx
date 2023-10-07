import PageTitle from "@components/common/page-title";
import Filter from "@components/filter";
import { FilterContextProvider } from "@components/filter/filter-context";
import initialFilterToggles from "@components/filter/initial-filter-toggles";
import { ChatBubbleLeftRightIcon } from "@heroicons/react/24/solid";
import getDebates from "@lib/api/debates/get-debates";
import {
  parseNumberSearchParam,
  parseStringArraySearchParam,
  parseStringSearchParam,
} from "@lib/utils/search-params";
import DebateList from "./debate-list";

interface Props {
  searchParams: {
    sok?: string | string[];
    sida?: string | string[];
    utskott?: string | string[];
  };
}

export default async function DebatesPage({ searchParams }: Props) {
  const page = parseNumberSearchParam(searchParams.sida) ?? 1;
  const search = parseStringSearchParam(searchParams.sok);
  const committees = parseStringArraySearchParam(searchParams.utskott);
  const debates = await getDebates({ search, page, committees });

  const filterToggles = initialFilterToggles(committees);

  return (
    <main>
      <PageTitle Icon={ChatBubbleLeftRightIcon}>Debatter</PageTitle>

      <div className="mx-4 mb-4 flex gap-2 2xl:container 2xl:mx-auto">
        <FilterContextProvider
          initialSearch={search}
          initialToggles={filterToggles}
        >
          <DebateList currentPage={page} debates={debates} />
          <Filter />
        </FilterContextProvider>
      </div>
    </main>
  );
}

export const metadata = {
  title: "Debatter | Partiguiden",
  description: "Här hittar du en lista på de senaste debatterna i riksdagen.",
};

export const dynamic = "force-dynamic";
