"use client";
import type { FilterToggle } from "@components/filter/filter-context";
import { useFilterContext } from "@components/filter/filter-context";
import type { VoteList } from "@lib/api/vote/types";
import { routes } from "@lib/navigation";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Vote from "./vote";
import Pagination from "@components/common/pagination";
import { useIsMount } from "@lib/hooks/use-is-mount";

interface QueryParameters {
  search: string;
  toggles: FilterToggle<string>;
  page?: number;
}

function buildQueryParameters({ search, toggles, page }: QueryParameters) {
  const query = new URLSearchParams();
  const activeToggles = Object.entries(toggles)
    .filter(([, value]) => value.value)
    .map(([key]) => key);
  for (const toggle of activeToggles) {
    query.append("utskott", toggle);
  }
  if (search) {
    query.set("sok", search);
  }

  if (page) {
    query.set("sida", page.toString());
  }

  return query;
}

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
      const query = buildQueryParameters({ search, toggles });
      router.replace(`${routes.votes}?${query}`);
    }, 500);
    return () => {
      clearTimeout(debounce);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router, search, toggles]);

  function onChangePage(newPage: number) {
    const query = buildQueryParameters({ search, toggles, page: newPage });
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
    <div className="grid flex-1 gap-4">
      <Pagination
        current={currentPage}
        total={votes.pages}
        onChange={onChangePage}
      />
      {votes.votes.map((vote) => (
        <Vote key={`${vote.documentId}:${vote.proposition}`} vote={vote} />
      ))}
      <Pagination
        current={currentPage}
        total={votes.pages}
        onChange={onChangePage}
      />
    </div>
  );
}
