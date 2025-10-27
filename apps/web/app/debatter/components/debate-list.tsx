"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

import FlowAdWrapper from "@components/ads/flow-ad-wrapper";
import Pagination from "@components/common/pagination";
import { useFilterContext } from "@components/filter/filter-context";
import type { DebateListResponse } from "@lib/api/debates/types";
import { routes } from "@lib/navigation";
import { buildSearchParameters } from "@lib/utils/search-params";

import DebateCard from "./debate-card";

interface Props {
  currentPage: number;
  debates: DebateListResponse;
}

export default function DebateList({ debates, currentPage }: Props) {
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
      router.replace(`${routes.debates}?${query.toString()}`);
    }, 500);

    return () => {
      clearTimeout(debounce);
    };
  }, [router, search, toggles]);

  function onChangePage(newPage: number) {
    const query = buildSearchParameters({ search, toggles, page: newPage });
    router.push(`${routes.debates}?${query.toString()}`);
  }

  if (debates.pages === 0) {
    return (
      <p className="flex-1 text-center text-xl sm:text-2xl">
        Inga debatter hittades
      </p>
    );
  }

  return (
    <div className="flex flex-1 flex-col gap-4">
      <Pagination
        current={currentPage}
        total={debates.pages}
        onChange={onChangePage}
      />
      {debates.debates.map((debate, index) => (
        <FlowAdWrapper key={debate.id} index={index}>
          <DebateCard debate={debate} />
        </FlowAdWrapper>
      ))}
      <Pagination
        current={currentPage}
        total={debates.pages}
        onChange={onChangePage}
        className="mt-auto"
      />
    </div>
  );
}
