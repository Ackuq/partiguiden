import { getPartyName } from "@partiguiden/party-data/utils";
import type { Party } from "@partiguiden/party-data/types";
import type { PartyData } from "../types/party";
import { getWikipediaAbstract, getWikipediaInfoBox } from "./wikipedia";

export const getParty = (party: Party): Promise<PartyData> => {
  return Promise.all([
    getWikipediaAbstract(party),
    getWikipediaInfoBox(party),
  ]).then(([abstract, infoBox]) => {
    return {
      abstract,
      ...infoBox,
      name: getPartyName(party),
    };
  });
};

export const partyController = (party: Party): Promise<PartyData> => {
  return getParty(party);
};
