import { Party } from "./types";

export const partyNames: Record<Party, string> = {
  [Party.S]: "Socialdemokraterna",
  [Party.SD]: "Sverigedemokraterna",
  [Party.M]: "Moderaterna",
  [Party.MP]: "Miljöpartiet",
  [Party.L]: "Liberalerna",
  [Party.KD]: "Kristdemokraterna",
  [Party.C]: "Centerpartiet",
  [Party.V]: "Vänsterpartiet",
};
