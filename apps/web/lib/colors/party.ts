import { Party } from "@partiguiden/party-data/types";

export const partyColors = Object.values(Party).reduce(
  (prev, current) => ({
    ...prev,
    [current]: `var(--party-${current}-color)`,
  }),
  {} as Record<Party, string>,
);
