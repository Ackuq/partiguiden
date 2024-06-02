import { PARLIAMENT_BASE_URL } from "@lib/constants";
import { body } from "@lib/utils/json";

import type { DocumentList } from "../parliament/types";
import { DEBATE_DOCUMENT_TYPES } from "./constants";
import parseDebates from "./parsers/debates";
import type { DebateListResponse } from "./types";

interface Query {
  search?: string;
  committees?: string[];
  page?: number;
}

export default async function getDebates({
  search = "",
  committees = [],
  page = 1,
}: Query): Promise<DebateListResponse> {
  const query = new URLSearchParams({
    doktyp: DEBATE_DOCUMENT_TYPES,
    webbtv: "1",
    sortorder: "desc",
    utformat: "json",
    sort: "datum",
    sok: search,
    p: page.toString(),
  });

  for (const committee of committees) {
    query.append("org", committee);
  }

  const response = await fetch(
    `${PARLIAMENT_BASE_URL}/dokumentlista/?${query.toString()}`,
  );

  const data = await body<DocumentList>(response);

  return parseDebates(data);
}
