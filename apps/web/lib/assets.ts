import type { Party } from "@partiguiden/party-data/types";

export function partyLogo(party: Party) {
  return `/party-logos/${party}.png`;
}
