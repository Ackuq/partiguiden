import type { Party } from "./types.ts";
import { parties } from "./types.ts";

export const partyNames: Record<Party, string> = {
  [parties.S]: "Socialdemokraterna",
  [parties.SD]: "Sverigedemokraterna",
  [parties.M]: "Moderaterna",
  [parties.MP]: "Miljöpartiet",
  [parties.L]: "Liberalerna",
  [parties.KD]: "Kristdemokraterna",
  [parties.C]: "Centerpartiet",
  [parties.V]: "Vänsterpartiet",
};
