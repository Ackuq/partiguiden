import type { DocumentList } from "@lib/api/parliament/types";
import parseDebateListEntry from "./debate-list-entry";

export default async function parseDebates(data: DocumentList) {
  const {
    dokumentlista: { dokument: document, "@sidor": pagesString },
  } = data;

  const pages = parseInt(pagesString, 10);

  if (!document || pages === 0) {
    return { debates: [], pages };
  }

  const debates = await Promise.all(document.map(parseDebateListEntry));

  return {
    debates,
    pages,
  };
}
