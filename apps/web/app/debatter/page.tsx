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

type SearchParams = Promise<{
  sok?: string | string[];
  sida?: string | string[];
  utskott?: string | string[];
}>;

interface Props {
  searchParams: SearchParams;
}

export default async function DebatesPage({ searchParams }: Props) {
  const { sida, sok, utskott } = await searchParams;
  const page = parseNumberSearchParam(sida) ?? 1;
  const search = parseStringSearchParam(sok);
  const committees = parseStringArraySearchParam(utskott);

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

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Debatter | Partiguiden",
  description: "Här hittar du en lista på de senaste debatterna i riksdagen.",
};
