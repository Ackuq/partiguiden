import type { Party } from "@partiguiden/party-data/types";
import { partyNames } from "@partiguiden/party-data/utils";

import getWikipediaAbstract from "../wikipedia/get-abstract";
import getWikipediaInfoBox from "../wikipedia/get-info-box";
import type { PartyData } from "./types";

export const getParty = (party: Party): Promise<PartyData> => {
  return Promise.all([
    getWikipediaAbstract(party),
    getWikipediaInfoBox(party),
  ]).then(([abstract, infoBox]) => {
    return {
      abstract,
      ...infoBox,
      name: partyNames[party],
    };
  });
};

export const partyController = (party: Party): Promise<PartyData> => {
  return getParty(party);
};
