import { body } from "@lib/utils/json";

import type { DocumentStatus } from "../parliament/types";
import { parseDocument } from "./parsers/document";

export const getDocumentJson = async (id: string) => {
  const response = await fetch(
    `https://data.riksdagen.se/dokument/${id}.json`,
    {
      cache: "force-cache",
    },
  );
  console.log(`https://data.riksdagen.se/dokument/${id}.json`);

  const data = await body<DocumentStatus>(response);

  return parseDocument(data);
};
