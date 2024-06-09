import { PARLIAMENT_BASE_URL } from "@lib/constants";
import { body } from "@lib/utils/json";
import { urlEncodedToParliamentId } from "@lib/utils/parliament-id";

import type { DocumentList } from "../parliament/types";
import { DEBATE_DOCUMENT_TYPES } from "./constants";
import parseDebate from "./parsers/debate";
import type { Debate } from "./types";

export default async function getDebate(
  id: string,
): Promise<Debate | undefined> {
  const query = new URLSearchParams({
    doktyp: DEBATE_DOCUMENT_TYPES,
    webbtv: "1",
    utformat: "json",
    sok: urlEncodedToParliamentId(id),
    sort: "datum",
  });

  const response = await fetch(
    `${PARLIAMENT_BASE_URL}/dokumentlista/?${query.toString()}`,
    {
      cache: "no-store",
    },
  );

  if (!response.ok) {
    return;
  }

  const data = await body<DocumentList>(response);
  return parseDebate(data);
}
