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

export const partyColors: Record<Party, string> = {
  [Party.C]: "#1e824c",
  [Party.KD]: "#22a7f0",
  [Party.L]: "#5c97bf",
  [Party.M]: "#3a539b",
  [Party.MP]: "#26a65b",
  [Party.S]: "#c0392b",
  [Party.SD]: "#f4d03f",
  [Party.V]: "#cf000f",
};
