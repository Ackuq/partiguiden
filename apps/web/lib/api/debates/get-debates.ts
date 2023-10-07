import { PARLIAMENT_BASE_URL } from "@lib/constants";
import parseDebates from "./parsers/debates";

const DEBATE_DOCUMENT_TYPES =
  "ip,bet,kam-ad,kam-al,kam-bd,kam-bu,kam-dv,kam-eu,kam-pd,kam-rd,kam-sd,kam-ud";

interface Query {
  search?: string;
  committees?: string[];
  page?: number;
}

export default async function getDebates({
  search = "",
  committees = [],
  page = 1,
}: Query) {
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
    `${PARLIAMENT_BASE_URL}/dokumentlista/?${query}`,
  );

  const data = await response.json();

  return parseDebates(data);
}
