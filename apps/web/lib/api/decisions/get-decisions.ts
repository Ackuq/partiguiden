import { PARLIAMENT_BASE_URL } from "@lib/constants";
import parseDecisions from "./parsers/decisions";

interface Query {
  search?: string;
  committees?: string[];
  page?: number;
}

export default async function getDecisions({
  search = "",
  committees = [],
  page = 1,
}: Query) {
  const query = new URLSearchParams({
    doktyp: "bet",
    dokstat: "beslutade",
    sortorder: "desc",
    utformat: "json",
    sok: search,
    p: page.toString(),
    sort: search ? "rel" : "datum",
  });
  for (const committee of committees) {
    query.append("org", committee);
  }

  const response = await fetch(
    `${PARLIAMENT_BASE_URL}/dokumentlista/?${query}`,
  );
  const data = await response.json();

  return parseDecisions(data);
}
