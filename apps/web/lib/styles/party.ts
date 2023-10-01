import { Party } from "@partiguiden/party-data/types";

export const partyBorderBottom: { [K in Party]: `border-b-party-${K}` } = {
  [Party.C]: "border-b-party-C",
  [Party.KD]: "border-b-party-KD",
  [Party.L]: "border-b-party-L",
  [Party.M]: "border-b-party-M",
  [Party.MP]: "border-b-party-MP",
  [Party.S]: "border-b-party-S",
  [Party.SD]: "border-b-party-SD",
  [Party.V]: "border-b-party-V",
};

export const partyTextColor: { [K in Party]: `text-party-${K}` } = {
  [Party.C]: "text-party-C",
  [Party.KD]: "text-party-KD",
  [Party.L]: "text-party-L",
  [Party.M]: "text-party-M",
  [Party.MP]: "text-party-MP",
  [Party.S]: "text-party-S",
  [Party.SD]: "text-party-SD",
  [Party.V]: "text-party-V",
} as const;

export const partyBackground: { [K in Party]: `bg-party-${K}` } = {
  [Party.C]: "bg-party-C",
  [Party.KD]: "bg-party-KD",
  [Party.L]: "bg-party-L",
  [Party.M]: "bg-party-M",
  [Party.MP]: "bg-party-MP",
  [Party.S]: "bg-party-S",
  [Party.SD]: "bg-party-SD",
  [Party.V]: "bg-party-V",
} as const;

export const partyBackgroundHover: { [K in Party]: `hover:bg-party-${K}/25` } =
  {
    [Party.C]: "hover:bg-party-C/25",
    [Party.KD]: "hover:bg-party-KD/25",
    [Party.L]: "hover:bg-party-L/25",
    [Party.M]: "hover:bg-party-M/25",
    [Party.MP]: "hover:bg-party-MP/25",
    [Party.S]: "hover:bg-party-S/25",
    [Party.SD]: "hover:bg-party-SD/25",
    [Party.V]: "hover:bg-party-V/25",
  } as const;

export const partyMarker: { [K in Party]: `marker:text-party-${K}` } = {
  [Party.C]: "marker:text-party-C",
  [Party.KD]: "marker:text-party-KD",
  [Party.L]: "marker:text-party-L",
  [Party.M]: "marker:text-party-M",
  [Party.MP]: "marker:text-party-MP",
  [Party.S]: "marker:text-party-S",
  [Party.SD]: "marker:text-party-SD",
  [Party.V]: "marker:text-party-V",
};
