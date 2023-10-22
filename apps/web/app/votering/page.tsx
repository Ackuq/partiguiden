import { ScaleIcon } from "@heroicons/react/24/solid";
import { Suspense } from "react";

import PageTitle from "@components/common/page-title";
import LoadingListWithFilter from "@components/loading/list-with-filter";
import {
  parseNumberSearchParam,
  parseStringArraySearchParam,
  parseStringSearchParam,
} from "@lib/utils/search-params";

import VoteListWrapper from "./components/vote-list-wrapper";

interface Props {
  searchParams: {
    sok?: string | string[];
    sida?: string | string[];
    utskott?: string | string[];
  };
}

export default function Votes({ searchParams }: Props) {
  const page = parseNumberSearchParam(searchParams.sida) ?? 1;
  const search = parseStringSearchParam(searchParams.sok);
  const committees = parseStringArraySearchParam(searchParams.utskott);

  return (
    <main>
      <PageTitle Icon={ScaleIcon}>Voteringar</PageTitle>
      <Suspense fallback={<LoadingListWithFilter />}>
        <VoteListWrapper search={search} committees={committees} page={page} />
      </Suspense>
    </main>
  );
}

export const dynamic = "force-dynamic";
export const runtime = "edge";

export const metadata = {
  title: "Voteringar | Partiguiden",
  description: "Hur har partierna röstat i voteringar? Ta reda på det här",
};
