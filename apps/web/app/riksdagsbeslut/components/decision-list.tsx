"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

import FlowAdWrapper from "@components/ads/flow-ad-wrapper";
import Pagination from "@components/common/pagination";
import { useFilterContext } from "@components/filter/filter-context";
import type { Decisions } from "@lib/api/decisions/types";
import { routes } from "@lib/navigation";
import { buildSearchParameters } from "@lib/utils/search-params";

import Decision from "./decision";

interface Props {
  currentPage: number;
  decisions: Decisions;
}

export default function DecisionList({ decisions, currentPage }: Props) {
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
      router.replace(`${routes.decisions}?${query.toString()}`);
    }, 500);
    return () => {
      clearTimeout(debounce);
    };
  }, [router, search, toggles]);

  function onChangePage(newPage: number) {
    const query = buildSearchParameters({ search, toggles, page: newPage });
    router.push(`${routes.decisions}?${query.toString()}`);
  }

  if (decisions.pages === 0) {
    return (
      <p className="flex-1 text-center text-xl sm:text-2xl">
        Inga beslut hittades
      </p>
    );
  }

  return (
    <div className="flex flex-1 flex-col gap-4">
      <Pagination
        current={currentPage}
        total={decisions.pages}
        onChange={onChangePage}
      />
      {decisions.decisions.map((decision, index) => (
        <FlowAdWrapper key={decision.id} index={index}>
          <Decision decision={decision} />
        </FlowAdWrapper>
      ))}
      <Pagination
        current={currentPage}
        total={decisions.pages}
        onChange={onChangePage}
        className="mt-auto"
      />
    </div>
  );
}
