"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

import FlowAdWrapper from "@components/ads/flow-ad-wrapper";
import Pagination from "@components/common/pagination";
import { useFilterContext } from "@components/filter/filter-context";
import type { VoteList as TVoteList } from "@lib/api/vote/types";
import { routes } from "@lib/navigation";
import { buildSearchParameters } from "@lib/utils/search-params";

import Vote from "./vote";

interface Props {
  currentPage: number;
  votes: TVoteList;
}

export default function VoteList({ votes, currentPage }: Props) {
  const hasMounted = useRef(false);
  const router = useRouter();
  const { search, toggles } = useFilterContext();

  useEffect(() => {
    if (!hasMounted.current) {
      hasMounted.current = true;
      return;
    }
    const debounce = setTimeout(() => {
      const query = buildSearchParameters({ search, toggles });
      router.replace(`${routes.votes}?${query.toString()}`);
    }, 500);
    return () => {
      clearTimeout(debounce);
    };
  }, [router, search, toggles]);

  function onChangePage(newPage: number) {
    const query = buildSearchParameters({ search, toggles, page: newPage });
    router.push(`${routes.votes}?${query.toString()}`);
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
