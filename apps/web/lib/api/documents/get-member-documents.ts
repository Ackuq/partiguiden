import { PARLIAMENT_BASE_URL } from "@lib/constants";
import { body } from "@lib/utils/json";

import type { DocumentList } from "../parliament/types";
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
    `${PARLIAMENT_BASE_URL}/dokumentlista/?${query.toString()}`,
    { cache: "no-store" },
  );
  const data = await body<DocumentList>(response);

  return parseMemberDocuments(data);
}
