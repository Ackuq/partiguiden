import { DocumentCheckIcon } from "@heroicons/react/24/solid";
import { Suspense } from "react";

import PageTitle from "@components/common/page-title";
import LoadingListWithFilter from "@components/loading/list-with-filter";
import {
  parseNumberSearchParam,
  parseStringArraySearchParam,
  parseStringSearchParam,
} from "@lib/utils/search-params";

import DecisionListWrapper from "./components/decision-list-wrapper";

type SearchParams = Promise<{
  sok?: string | string[];
  sida?: string | string[];
  utskott?: string | string[];
}>;

interface Props {
  searchParams: SearchParams;
}

export default async function Decisions({ searchParams }: Props) {
  const { sok, sida, utskott } = await searchParams;
  const page = parseNumberSearchParam(sida) ?? 1;
  const search = parseStringSearchParam(sok);
  const committees = parseStringArraySearchParam(utskott);

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
