"use client";
import Pagination from "@components/common/pagination";
import { useFilterContext } from "@components/filter/filter-context";
import type { DebateListResponse } from "@lib/api/debates/types";
import { useIsMount } from "@lib/hooks/use-is-mount";
import { routes } from "@lib/navigation";
import { buildSearchParameters } from "@lib/utils/search-params";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import DebateCard from "./debate-card";
import FlowAdWrapper from "@components/ads/flow-ad-wrapper";

interface Props {
  currentPage: number;
  debates: DebateListResponse;
}

export default function DebateList({ debates, currentPage }: Props) {
  const router = useRouter();
  const isMount = useIsMount();
  const { search, toggles } = useFilterContext();

  useEffect(() => {
    if (isMount) {
      return;
    }
    const debounce = setTimeout(() => {
      const query = buildSearchParameters({ search, toggles });
      router.replace(`${routes.debates}?${query}`);
    }, 500);

    return () => {
      clearTimeout(debounce);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router, search, toggles]);

  function onChangePage(newPage: number) {
    const query = buildSearchParameters({ search, toggles, page: newPage });
    router.push(`${routes.debates}?${query}`);
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
