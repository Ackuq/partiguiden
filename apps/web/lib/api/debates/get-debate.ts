import { PARLIAMENT_BASE_URL } from "@lib/constants";

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
    sok: id,
    sort: "datum",
  });

  const response = await fetch(
    `${PARLIAMENT_BASE_URL}/dokumentlista/?${query}`,
    {
      cache: "no-store",
    },
  );

  if (!response.ok) {
    return;
  }

  const data: DocumentList = await response.json();
  return parseDebate(data);
}
