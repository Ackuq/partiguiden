import { Party } from "@partiguiden/party-data/types";

export const borderBottom = {
  [Party.C]: "border-b-party-c",
  [Party.KD]: "border-b-party-kd",
  [Party.L]: "border-b-party-l",
  [Party.M]: "border-b-party-m",
  [Party.MP]: "border-b-party-mp",
  [Party.S]: "border-b-party-s",
  [Party.SD]: "border-b-party-sd",
  [Party.V]: "border-b-party-v",
} as const;

export const textColor = {
  [Party.C]: "text-party-c",
  [Party.KD]: "text-party-kd",
  [Party.L]: "text-party-l",
  [Party.M]: "text-party-m",
  [Party.MP]: "text-party-mp",
  [Party.S]: "text-party-s",
  [Party.SD]: "text-party-sd",
  [Party.V]: "text-party-v",
} as const;

export const background = {
  [Party.C]: "bg-party-c",
  [Party.KD]: "bg-party-kd",
  [Party.L]: "bg-party-l",
  [Party.M]: "bg-party-m",
  [Party.MP]: "bg-party-mp",
  [Party.S]: "bg-party-s",
  [Party.SD]: "bg-party-sd",
  [Party.V]: "bg-party-v",
} as const;

export const backgroundHover = {
  [Party.C]: "hover:bg-party-c/25",
  [Party.KD]: "hover:bg-party-kd/25",
  [Party.L]: "hover:bg-party-l/25",
  [Party.M]: "hover:bg-party-m/25",
  [Party.MP]: "hover:bg-party-mp/25",
  [Party.S]: "hover:bg-party-s/25",
  [Party.SD]: "hover:bg-party-sd/25",
  [Party.V]: "hover:bg-party-v/25",
} as const;

export const marker = {
  [Party.C]: "marker:text-party-c",
  [Party.KD]: "marker:text-party-kd",
  [Party.L]: "marker:text-party-l",
  [Party.M]: "marker:text-party-m",
  [Party.MP]: "marker:text-party-mp",
  [Party.S]: "marker:text-party-s",
  [Party.SD]: "marker:text-party-sd",
  [Party.V]: "marker:text-party-v",
};
