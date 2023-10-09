import PageTitle from "@components/common/page-title";
import { DocumentCheckIcon } from "@heroicons/react/24/solid";
import {
  parseNumberSearchParam,
  parseStringArraySearchParam,
  parseStringSearchParam,
} from "@lib/utils/search-params";
import DecisionListWrapper from "./components/decision-list-wrapper";
import { Suspense } from "react";
import LoadingListWithFilter from "@components/loading/list-with-filter";

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

  return (
    <main>
      <PageTitle Icon={DocumentCheckIcon}>Riksdagsbesult</PageTitle>
      <Suspense fallback={<LoadingListWithFilter />}>
        <DecisionListWrapper
          page={page}
          search={search}
          committees={committees}
        />
      </Suspense>
    </main>
  );
}

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Riksdagsbeslut | Partiguiden",
  description:
    "Vad tar riksdagen för beslut? Här hittar du en sammanfattning på de senaste besluten som tas upp i riksdagen.",
};
