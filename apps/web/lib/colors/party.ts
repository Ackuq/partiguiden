import type { Party } from "@partiguiden/party-data/types";
import { parties } from "@partiguiden/party-data/types";

export const partyColors = Object.values(parties).reduce(
  (prev, current) => ({
    ...prev,
    [current]: `var(--color-party-${current})`,
  }),
  {} as Record<Party, string>,
);
