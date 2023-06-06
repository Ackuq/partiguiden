import { PartyAbbreviation } from '../../utils/parties';
import { WikipediaInfoBox } from '../../types/party';
import { getAbstract, getInfoBoxAttr } from '../serializers/wikipedia';
import { wikipediaPartyMap } from '../helpers/wikipediaUtils';

const sleep = (ms: number) =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });

export const getWikipediaAbstract = (party: Lowercase<PartyAbbreviation>): Promise<string> =>
  fetch(
    `https://sv.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&redirects=1&titles=${encodeURIComponent(
      wikipediaPartyMap[party]
    )}`
  ).then(async (res) => {
    if (res.status === 429) {
      await sleep(1000);
      return getWikipediaAbstract(party);
    }
    const json = await res.json();

    return getAbstract(json);
  });

export const getWikipediaInfoBox = (
  party: Lowercase<PartyAbbreviation>
): Promise<WikipediaInfoBox> =>
  fetch(
    `https://sv.wikipedia.org/w/api.php?action=parse&format=json&section=0&prop=text&page=${encodeURIComponent(
      wikipediaPartyMap[party]
    )}`
  ).then(async (res) => {
    if (res.status === 429) {
      await sleep(1000);
      return getWikipediaInfoBox(party);
    }
    const json = await res.json();

    return getInfoBoxAttr(json, party);
  });
