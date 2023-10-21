import { ChatBubbleLeftRightIcon } from "@heroicons/react/24/solid";
import { Suspense } from "react";

import PageTitle from "@components/common/page-title";
import LoadingListWithFilter from "@components/loading/list-with-filter";
import {
  parseNumberSearchParam,
  parseStringArraySearchParam,
  parseStringSearchParam,
} from "@lib/utils/search-params";

import DebateListWrapper from "./components/debate-list-wrapper";

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

  return (
    <main>
      <PageTitle Icon={ChatBubbleLeftRightIcon}>Debatter</PageTitle>

      <Suspense fallback={<LoadingListWithFilter />}>
        <DebateListWrapper
          search={search}
          committees={committees}
          page={page}
        />
      </Suspense>
    </main>
  );
}

export const metadata = {
  title: "Debatter | Partiguiden",
  description: "Här hittar du en lista på de senaste debatterna i riksdagen.",
};

export const dynamic = "force-dynamic";
