import { Party } from "@partiguiden/party-data/types";

type PartyColorStyleProp<S extends string, E extends string = ""> = {
  [P in Party]: `${S}-party-${P}${E} dark:${S}-party-${P}-dark${E}`;
};

export const partyBorderBottom: PartyColorStyleProp<"border-b"> = {
  [Party.S]: "border-b-party-S dark:border-b-party-S-dark",
  [Party.SD]: "border-b-party-SD dark:border-b-party-SD-dark",
  [Party.M]: "border-b-party-M dark:border-b-party-M-dark",
  [Party.MP]: "border-b-party-MP dark:border-b-party-MP-dark",
  [Party.L]: "border-b-party-L dark:border-b-party-L-dark",
  [Party.KD]: "border-b-party-KD dark:border-b-party-KD-dark",
  [Party.C]: "border-b-party-C dark:border-b-party-C-dark",
  [Party.V]: "border-b-party-V dark:border-b-party-V-dark",
};

export const partyTextColor: PartyColorStyleProp<"text"> = {
  [Party.S]: "text-party-S dark:text-party-S-dark",
  [Party.SD]: "text-party-SD dark:text-party-SD-dark",
  [Party.M]: "text-party-M dark:text-party-M-dark",
  [Party.MP]: "text-party-MP dark:text-party-MP-dark",
  [Party.L]: "text-party-L dark:text-party-L-dark",
  [Party.KD]: "text-party-KD dark:text-party-KD-dark",
  [Party.C]: "text-party-C dark:text-party-C-dark",
  [Party.V]: "text-party-V dark:text-party-V-dark",
};

export const partyBackgroundHover: PartyColorStyleProp<"hover:bg", "/25"> = {
  [Party.S]: "hover:bg-party-S/25 dark:hover:bg-party-S-dark/25",
  [Party.SD]: "hover:bg-party-SD/25 dark:hover:bg-party-SD-dark/25",
  [Party.M]: "hover:bg-party-M/25 dark:hover:bg-party-M-dark/25",
  [Party.MP]: "hover:bg-party-MP/25 dark:hover:bg-party-MP-dark/25",
  [Party.L]: "hover:bg-party-L/25 dark:hover:bg-party-L-dark/25",
  [Party.KD]: "hover:bg-party-KD/25 dark:hover:bg-party-KD-dark/25",
  [Party.C]: "hover:bg-party-C/25 dark:hover:bg-party-C-dark/25",
  [Party.V]: "hover:bg-party-V/25 dark:hover:bg-party-V-dark/25",
};

export const partyMarker: PartyColorStyleProp<"marker:text"> = {
  [Party.S]: "marker:text-party-S dark:marker:text-party-S-dark",
  [Party.SD]: "marker:text-party-SD dark:marker:text-party-SD-dark",
  [Party.M]: "marker:text-party-M dark:marker:text-party-M-dark",
  [Party.MP]: "marker:text-party-MP dark:marker:text-party-MP-dark",
  [Party.L]: "marker:text-party-L dark:marker:text-party-L-dark",
  [Party.KD]: "marker:text-party-KD dark:marker:text-party-KD-dark",
  [Party.C]: "marker:text-party-C dark:marker:text-party-C-dark",
  [Party.V]: "marker:text-party-V dark:marker:text-party-V-dark",
};
