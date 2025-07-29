import type { Party } from "@partiguiden/party-data/types";
import { parties, partySortOrder } from "@partiguiden/party-data/types";
import { partyNames } from "@partiguiden/party-data/utils";

import type { AveragePoll, Poll, PollDetails, Polls } from "./types";

function initializePartyTotal(): Record<Party, PollDetails[]> {
  return Object.values(parties).reduce(
    (prev, party) => ({ ...prev, [party]: [] }),
    {} as Record<Party, PollDetails[]>,
  );
}

function aggregatePollData(
  partyTotal: Record<Party, PollDetails[]>,
  poll: Poll,
) {
  Object.entries(poll.data).forEach(([party, value]) => {
    partyTotal[party as Party].push({
      value: value,
      institute: poll.institute,
      publishedDate: poll.publishedDate,
    });
  });
}

function calculateAveragePerParty(
  partyTotal: Record<Party, PollDetails[]>,
): AveragePoll {
  return partySortOrder.map((party) => {
    const details = partyTotal[party];
    const sum = details.reduce((prev, curr) => prev + curr.value, 0);
    const name = partyNames[party] || party;
    return {
      party,
      name,
      value: parseFloat((sum / details.length).toFixed(2)),
      details: details.sort(
        (a, b) => a.publishedDate.getTime() - b.publishedDate.getTime(),
      ),
    };
  });
}

/**
 * Calculates the average per party of the collected poll data
 */
export default function getPollAverage(polls: Polls) {
  const partyTotal = initializePartyTotal();

  // Aggregate poll data by party
  for (const year of Object.values(polls)) {
    for (const month of Object.values(year)) {
      month.forEach((poll) => aggregatePollData(partyTotal, poll));
    }
  }

  // Calculate average for each party
  return calculateAveragePerParty(partyTotal);
}
