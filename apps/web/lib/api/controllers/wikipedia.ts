import type { WikipediaInfoBox } from "../types/wikipedia";
import { getAbstract, getInfoBoxAttr } from "../serializers/wikipedia";
import { wikipediaPartyMap } from "../utils/wikipedia";
import type { Party } from "@partiguiden/party-data/types";

const sleep = (ms: number) =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });

export const getWikipediaAbstract = (party: Party): Promise<string> =>
  fetch(
    `https://sv.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&redirects=1&titles=${encodeURIComponent(
      wikipediaPartyMap[party],
    )}`,
    {
      next: { revalidate: 60 * 60 * 24 },
    },
  ).then(async (res) => {
    if (res.status === 429) {
      await sleep(1000);
      return getWikipediaAbstract(party);
    }
    const json = await res.json();

    return getAbstract(json);
  });

export const getWikipediaInfoBox = (party: Party): Promise<WikipediaInfoBox> =>
  fetch(
    `https://sv.wikipedia.org/w/api.php?action=parse&format=json&section=0&prop=text&page=${encodeURIComponent(
      wikipediaPartyMap[party],
    )}`,
    {
      next: { revalidate: 60 * 60 * 24 },
    },
  ).then(async (res) => {
    if (res.status === 429) {
      await sleep(1000);
      return getWikipediaInfoBox(party);
    }
    const json = await res.json();

    return getInfoBoxAttr(json, party);
  });
