import type { Party } from "@partiguiden/party-data/types";
import { parties } from "@partiguiden/party-data/types";

type PartyColorStyleProp<S extends string, E extends string = ""> = {
  [P in Party]: `${S}-party-${P}${E} dark:${S}-party-${P}-dark${E}`;
};

export const partyBorderBottom: PartyColorStyleProp<"border-b"> = {
  [parties.S]: "border-b-party-S dark:border-b-party-S-dark",
  [parties.SD]: "border-b-party-SD dark:border-b-party-SD-dark",
  [parties.M]: "border-b-party-M dark:border-b-party-M-dark",
  [parties.MP]: "border-b-party-MP dark:border-b-party-MP-dark",
  [parties.L]: "border-b-party-L dark:border-b-party-L-dark",
  [parties.KD]: "border-b-party-KD dark:border-b-party-KD-dark",
  [parties.C]: "border-b-party-C dark:border-b-party-C-dark",
  [parties.V]: "border-b-party-V dark:border-b-party-V-dark",
};

export const partyTextColor: PartyColorStyleProp<"text"> = {
  [parties.S]: "text-party-S dark:text-party-S-dark",
  [parties.SD]: "text-party-SD dark:text-party-SD-dark",
  [parties.M]: "text-party-M dark:text-party-M-dark",
  [parties.MP]: "text-party-MP dark:text-party-MP-dark",
  [parties.L]: "text-party-L dark:text-party-L-dark",
  [parties.KD]: "text-party-KD dark:text-party-KD-dark",
  [parties.C]: "text-party-C dark:text-party-C-dark",
  [parties.V]: "text-party-V dark:text-party-V-dark",
};

export const partyBackgroundHover: PartyColorStyleProp<"hover:bg", "/25"> = {
  [parties.S]: "hover:bg-party-S/25 dark:hover:bg-party-S-dark/25",
  [parties.SD]: "hover:bg-party-SD/25 dark:hover:bg-party-SD-dark/25",
  [parties.M]: "hover:bg-party-M/25 dark:hover:bg-party-M-dark/25",
  [parties.MP]: "hover:bg-party-MP/25 dark:hover:bg-party-MP-dark/25",
  [parties.L]: "hover:bg-party-L/25 dark:hover:bg-party-L-dark/25",
  [parties.KD]: "hover:bg-party-KD/25 dark:hover:bg-party-KD-dark/25",
  [parties.C]: "hover:bg-party-C/25 dark:hover:bg-party-C-dark/25",
  [parties.V]: "hover:bg-party-V/25 dark:hover:bg-party-V-dark/25",
};

export const partyMarker: PartyColorStyleProp<"marker:text"> = {
  [parties.S]: "marker:text-party-S dark:marker:text-party-S-dark",
  [parties.SD]: "marker:text-party-SD dark:marker:text-party-SD-dark",
  [parties.M]: "marker:text-party-M dark:marker:text-party-M-dark",
  [parties.MP]: "marker:text-party-MP dark:marker:text-party-MP-dark",
  [parties.L]: "marker:text-party-L dark:marker:text-party-L-dark",
  [parties.KD]: "marker:text-party-KD dark:marker:text-party-KD-dark",
  [parties.C]: "marker:text-party-C dark:marker:text-party-C-dark",
  [parties.V]: "marker:text-party-V dark:marker:text-party-V-dark",
};
