import { PARLIAMENT_BASE_URL } from "@lib/constants";

import parseMemberDocuments from "./parsers/member-documents";

interface Query {
  id: string;
  page: number;
}

export default async function getMemberDocuments({ id, page }: Query) {
  const query = new URLSearchParams({
    iid: id,
    p: page.toString(),
    avd: "dokument",
    sort: "datum",
    sortorder: "datum",
    utformat: "json",
  });

  const response = await fetch(
    `${PARLIAMENT_BASE_URL}/dokumentlista/?${query}`,
    { next: { revalidate: 60 * 60 * 24 } },
  );
  const data = await response.json();

  return parseMemberDocuments(data);
}
