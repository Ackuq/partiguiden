"use client";

import { useFilterContext } from "@components/filter/filter-context";
import type { VoteList } from "@lib/api/vote/types";
import { routes } from "@lib/navigation";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Vote from "./vote";
import Pagination from "@components/common/pagination";
import { useIsMount } from "@lib/hooks/use-is-mount";
import { buildSearchParameters } from "@lib/utils/search-params";
import FlowAdWrapper from "@components/ads/flow-ad-wrapper";

interface Props {
  currentPage: number;
  votes: VoteList;
}

export default function VoteList({ votes, currentPage }: Props) {
  const router = useRouter();
  const isMount = useIsMount();
  const { search, toggles } = useFilterContext();

  useEffect(() => {
    if (isMount) {
      return;
    }
    const debounce = setTimeout(() => {
      const query = buildSearchParameters({ search, toggles });
      router.replace(`${routes.votes}?${query}`);
    }, 500);
    return () => {
      clearTimeout(debounce);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router, search, toggles]);

  function onChangePage(newPage: number) {
    const query = buildSearchParameters({ search, toggles, page: newPage });
    router.push(`${routes.votes}?${query}`);
  }

  if (votes.pages === 0) {
    return (
      <p className="flex-1 text-center text-xl sm:text-2xl">
        Inga voteringar hittades
      </p>
    );
  }

  return (
    <div className="flex flex-1 flex-col gap-4">
      <Pagination
        current={currentPage}
        total={votes.pages}
        onChange={onChangePage}
      />
      {votes.votes.map((vote, index) => (
        <FlowAdWrapper
          index={index}
          key={`${vote.documentId}:${vote.proposition}`}
        >
          <Vote vote={vote} />
        </FlowAdWrapper>
      ))}
      <Pagination
        current={currentPage}
        total={votes.pages}
        onChange={onChangePage}
        className="mt-auto"
      />
    </div>
  );
}
