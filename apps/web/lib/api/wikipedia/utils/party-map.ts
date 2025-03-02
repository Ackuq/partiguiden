import type { Party } from "@partiguiden/party-data/types";
import { parties } from "@partiguiden/party-data/types";

export const wikipediaPartyMap: Record<Party, string> = {
  [parties.S]: "Socialdemokraterna_(Sverige)",
  [parties.M]: "Moderaterna",
  [parties.SD]: "Sverigedemokraterna",
  [parties.C]: "Centerpartiet",
  [parties.V]: "Vänsterpartiet",
  [parties.KD]: "Kristdemokraterna_(Sverige)",
  [parties.L]: "Liberalerna",
  [parties.MP]: "Miljöpartiet",
};
