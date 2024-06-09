import { PARLIAMENT_BASE_URL } from "@lib/constants";
import { body } from "@lib/utils/json";

import type { DocumentList } from "./types";

interface Query {
  rm?: string;
  from?: string;
  to?: string;
}

export default async function getProtocols({
  rm = "",
  from = "",
  to = "",
}: Query): Promise<DocumentList | undefined> {
  const query = new URLSearchParams({
    doktyp: "prot",
    rm: rm,
    from: from,
    tom: to,
    sort: "rel",
    sortorder: "desc",
    utformat: "json",
  });

  const response = await fetch(
    `${PARLIAMENT_BASE_URL}/dokumentlista/?${query.toString()}`,
    {
      next: {
        revalidate: 60 * 60 * 24, // Once per day
      },
    },
  );

  if (!response.ok) {
    return;
  }

  return body<DocumentList>(response);
}
