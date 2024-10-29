import { Party } from "@partiguiden/party-data/types";

import type { MonthlyAverage, Poll, Polls } from "./types";

function initializePollResults(): Record<Party, number[]> {
  return Object.values(Party).reduce(
    (acc, party) => {
      acc[party] = [];
      return acc;
    },
    {} as Record<Party, number[]>,
  );
}

function calculateMonthlyAverageForDate(
  year: number,
  month: number,
  data: Poll[],
): MonthlyAverage[number] {
  const pollResults = initializePollResults();

  data.forEach((poll) => {
    Object.entries(poll.data).forEach(([party, value]) => {
      pollResults[party as Party].push(value);
    });
  });

  const date = `${year}-${(month + 1).toString().padStart(2, "0")}`;

  return Object.entries(pollResults).reduce(
    (acc, [party, values]) => {
      acc[party as Party] = (
        values.reduce((a, b) => a + b, 0) / values.length
      ).toFixed(2);
      return acc;
    },
    { date } as MonthlyAverage[number],
  );
}

export default function getMonthlyAverage(polls: Polls): MonthlyAverage {
  return Object.entries(polls).flatMap(([yearString, yearData]) => {
    const year = parseInt(yearString, 10);
    return Object.entries(yearData).map(([monthString, monthData]) => {
      const month = parseInt(monthString, 10);
      return calculateMonthlyAverageForDate(year, month, monthData);
    });
  });
}
