import { body } from "@lib/utils/json";
import sleep from "@lib/utils/sleep";
import type { Party } from "@partiguiden/party-data/types";

import type { WikipediaAbstractResponse } from "./parsers/abstract";
import parseAbstract from "./parsers/abstract";
import { wikipediaPartyMap } from "./utils/party-map";

export default async function getWikipediaAbstract(
  party: Party,
): Promise<string> {
  const response = await fetch(
    `https://sv.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&redirects=1&titles=${encodeURIComponent(
      wikipediaPartyMap[party],
    )}`,
    {
      next: { revalidate: 60 * 60 * 24 },
    },
  );
  if (response.status === 429) {
    await sleep(1000);
    return getWikipediaAbstract(party);
  }
  const data = await body<WikipediaAbstractResponse>(response);

  return parseAbstract(data);
}
