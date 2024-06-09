import type { DocumentStatus } from "@lib/api/parliament/types";

interface Document {
  id: string;
  title: string;
}

export function parseDocument(document: DocumentStatus): Document {
  const {
    dokumentstatus: {
      dokument: { dok_id: id, titel: title },
    },
  } = document;

  return {
    id,
    title,
  };
}
