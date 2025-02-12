import { Party } from "@partiguiden/party-data/types";

export const partyColors = Object.values(Party).reduce(
  (prev, current) => ({
    ...prev,
    [current]: `var(--color-party-${current})`,
  }),
  {} as Record<Party, string>,
);
