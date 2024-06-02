import stripJsonComments from "strip-json-comments";

import type { DocumentStatus } from "@lib/api/parliament/types";
import { parse } from "@lib/utils/json";

export default async function checkIfVotesExist(url: string): Promise<boolean> {
  const response = await fetch(url, {
    next: {
      revalidate: 60 * 60 * 24,
    },
  });
  const text = await response.text();
  const data = parse<DocumentStatus>(stripJsonComments(text));

  const { dokumentstatus } = data;

  if (!dokumentstatus.dokutskottsforslag) {
    return false;
  }

  const { utskottsforslag: suggestions } = dokumentstatus.dokutskottsforslag;

  if (
    !Array.isArray(suggestions) &&
    suggestions.votering_id !== null &&
    suggestions.votering_id !== ""
  ) {
    return true;
  }

  if (Array.isArray(suggestions)) {
    for (const suggestion of suggestions) {
      if (suggestion.votering_id !== null && suggestion.votering_id !== "") {
        return true;
      }
    }
  }
  return false;
}
