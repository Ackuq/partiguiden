import sleep from "@lib/utils/sleep";
import type { Party } from "@partiguiden/party-data/types";

import type { WikipediaInfoBoxResponse } from "./parsers/info-box";
import { getInfoBoxAttr } from "./parsers/info-box";
import type { WikipediaInfoBox } from "./types";
import { wikipediaPartyMap } from "./utils/party-map";

export default async function getWikipediaInfoBox(
  party: Party,
): Promise<WikipediaInfoBox> {
  const response = await fetch(
    `https://sv.wikipedia.org/w/api.php?action=parse&format=json&section=0&prop=text&page=${encodeURIComponent(
      wikipediaPartyMap[party],
    )}`,
    {
      next: { revalidate: 60 * 60 * 24 },
    },
  );
  if (response.status === 429) {
    await sleep(1000);
    return getWikipediaInfoBox(party);
  }
  const data = (await response.json()) as WikipediaInfoBoxResponse;
  return getInfoBoxAttr(data, party);
}
