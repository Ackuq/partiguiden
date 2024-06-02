import { PARLIAMENT_BASE_URL } from "@lib/constants";
import { body } from "@lib/utils/json";

import type { DocumentList } from "../parliament/types";
import { parseVotes } from "./parsers/votes";

interface Query {
  search?: string;
  committees: string[];
  page?: number;
}

export async function getVotes({ search, committees, page }: Query) {
  const query = new URLSearchParams({
    doktyp: "votering",
    sortorder: "desc",
    utformat: "json",
    sok: search || "",
    sort: search ? "rel" : "datum",
    p: page?.toString() || "",
  });
  for (const committe of committees) {
    query.append("org", committe);
  }

  const response = await fetch(
    `${PARLIAMENT_BASE_URL}/dokumentlista/?${query.toString()}`,
    {
      cache: "no-store",
    },
  );

  const data = await body<DocumentList>(response);

  return parseVotes(data);
}
