import PromisePool from "@supercharge/promise-pool";

import type { DocumentList } from "@lib/api/parliament/types";

import type { DebateListResponse } from "../types";
import parseDebateListEntry from "./debate-list-entry";

export default async function parseDebates(
  data: DocumentList,
): Promise<DebateListResponse> {
  const {
    dokumentlista: { dokument: document, "@sidor": pagesString },
  } = data;

  const pages = parseInt(pagesString, 10);

  if (!document || pages === 0) {
    return { debates: [], pages };
  }

  const debates = await PromisePool.withConcurrency(10)
    .for(document)
    .process(parseDebateListEntry);

  return {
    debates: debates.results,
    pages,
  };
}
