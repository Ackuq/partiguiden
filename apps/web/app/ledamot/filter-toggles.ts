import type { FilterToggle } from "@components/filter/filter-context";
import type { MemberParty } from "@lib/api/parliament/types";
import { Party } from "@partiguiden/party-data/types";
import { partyNames } from "@partiguiden/party-data/utils";

const order = [
  Party.C,
  Party.KD,
  Party.L,
  Party.MP,
  Party.M,
  Party.S,
  Party.SD,
  Party.V,
  "-",
] as const;

export const partyFilterToggles: FilterToggle<MemberParty> = order.reduce(
  (prev, party) => ({
    ...prev,
    [party]: {
      title: party === "-" ? "Partilösa" : partyNames[party],
      value: false,
    },
  }),
  {} as FilterToggle<MemberParty>,
);
