import type { Polls } from "../types";

/**
 * Filter poll data to within certain dates
 * @param polls The poll data
 * @param from The from date
 * @param to The to date
 * @returns The filtered poll data
 */
export const getWithin = (
  polls: Polls,
  from: Date,
  to: Date = new Date(),
): Polls => {
  const filtered: Polls = {};

  const usedInstitutes: string[] = [];

  const addMonth = (year: number, month: number) => {
    // If theres no polls for this month, return
    if (!polls[year]?.[month]) {
      return;
    }

    if (!filtered[year]) {
      filtered[year] = {};
    }
    if (!filtered[year][month]) {
      filtered[year][month] = [];
    }

    for (const poll of polls[year][month]) {
      if (!usedInstitutes.includes(poll.institute)) {
        filtered[year][month].push(poll);
        usedInstitutes.push(poll.institute);
      }
    }
  };

  const iterateMonthsOfYear = (
    year: number,
    startMonth: number,
    endMonth: number,
  ) => {
    for (let month = startMonth; month >= endMonth; month--) {
      addMonth(year, month);
    }
  };

  for (let year = to.getFullYear(); year >= from.getFullYear(); year--) {
    const startMonth = to.getFullYear() === year ? to.getMonth() : 11;
    const endMonth = from.getFullYear() === year ? from.getMonth() : 0;
    iterateMonthsOfYear(year, startMonth, endMonth);
  }

  return filtered;
};
