import type { Party } from "@partiguiden/party-data/types";

export function partyLogo(party: Party) {
  return `/static/images/party-logos/${party.toUpperCase()}.png`;
}
