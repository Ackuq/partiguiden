import { Party } from "./types";

export function getPartyName(party: Party): string {
  switch (party) {
    case Party.C:
      return "Centerpartiet";
    case Party.KD:
      return "Kristdemokraterna";
    case Party.L:
      return "Liberalerna";
    case Party.M:
      return "Moderaterna";
    case Party.MP:
      return "Miljöpartiet";
    case Party.S:
      return "Socialdemokraterna";
    case Party.SD:
      return "Sverigedemokraterna";
    case Party.V:
      return "Vänsterpartiet";
  }
}

export const partyColors = {
  [Party.C]: "#1e824c",
  [Party.KD]: "#22a7f0",
  [Party.L]: "#5c97bf",
  [Party.M]: "#3a539b",
  [Party.MP]: "#26a65b",
  [Party.S]: "#c0392b",
  [Party.SD]: "#f4d03f",
  [Party.V]: "#cf000f",
};
