import { partyAbbrev, partyAbbreviations } from '../types/party.d';
import { Polls } from '../types/polls';

const MONTH_MAP = {
  jan: 0,
  feb: 1,
  mar: 2,
  apr: 3,
  maj: 4,
  jun: 5,
  jul: 6,
  aug: 7,
  sep: 8,
  okt: 9,
  nov: 10,
  dec: 11,
};

const parsePolls = (data: string): Polls => {
  const polls: Polls = {};
  const rows = data.split('\n');
  rows.pop();
  const header = rows.shift() as string;
  const partyOrdering = header.split(',').slice(2, 10) as Array<partyAbbrev>;

  rows.forEach((row) => {
    const fields = row.split(',');
    const yearMonth = fields[0].split('-') as [string, keyof typeof MONTH_MAP];

    const year = parseInt(yearMonth[0]);

    const month = MONTH_MAP[yearMonth[1]];

    if (!polls[year]) {
      polls[year] = new Array(Object.keys(MONTH_MAP).length);
    }

    if (!polls[year][month]) {
      polls[year][month] = [];
    }

    const institute = fields[1];
    const data = fields
      .slice(2, 10)
      .reduce(
        (prev, curr, i) => ({ ...prev, [partyOrdering[i]]: parseFloat(curr) }),
        {} as Record<partyAbbrev, number>
      );
    const from = fields[14];
    const to = fields[15];

    polls[year][month].push({
      from,
      to,
      institute,
      data,
    });
  });

  return polls;
};

const POLLS_URL = 'https://raw.githubusercontent.com/hjnilsson/SwedishPolls/master/Data/Polls.csv';

export const getPolls = (): Promise<Polls> =>
  fetch(POLLS_URL)
    .then((res) => res.text())
    .then(parsePolls);

export const getWithin = (polls: Polls, from: Date, to: Date): Polls => {
  const filtered: Polls = {};

  const [fromYear, toYear] = [from.getFullYear(), to.getFullYear()];

  if (fromYear === toYear) {
    const year = fromYear;
    filtered[year] = {};
    for (let i = from.getMonth(); i <= to.getMonth(); i++) {
      filtered[year][i] = polls[year][i];
    }
  } else {
    // Get from from year
    filtered[fromYear] = {};
    for (let i = from.getMonth(); i < 12; i++) {
      filtered[fromYear][i] = polls[fromYear][i];
    }
    // Get in between
    for (let i = fromYear + 1; i < toYear; i++) {
      filtered[i] = polls[i];
    }

    filtered[toYear] = {};
    for (let i = to.getMonth(); i >= 0; i--) {
      filtered[toYear][i] = polls[toYear][i];
    }
  }

  return filtered;
};

export const formatData = (
  data: Record<partyAbbrev, number>
): Array<{ name: string; value: number }> =>
  Object.keys(data).map((name) => ({ name, value: data[name as partyAbbrev] }));

export type AveragePoll = Record<partyAbbrev, [number, Array<[number, string]>]>;

export const getAverage = (polls: Polls): AveragePoll => {
  const partyAll = partyAbbreviations.reduce(
    (prev, curr) => ({ ...prev, [curr]: [] }),
    {} as Record<partyAbbrev, Array<[number, string]>>
  );

  for (const party of partyAbbreviations) {
    partyAll[party] = [];
  }

  for (const pollYear of Object.values(polls)) {
    for (const pollMonth of Object.values(pollYear as Polls[number])) {
      if (pollMonth) {
        for (const poll of Object.values(pollMonth)) {
          for (const [party, value] of Object.entries(poll.data)) {
            partyAll[party as partyAbbrev].push([value, poll.institute]);
          }
        }
      }
    }
  }

  const result = Object.keys(partyAll).reduce((acc, party) => {
    const totalArray = partyAll[party as partyAbbrev];
    const sum = totalArray.reduce((prev, curr) => prev + curr[0], 0);
    return { ...acc, [party]: [(sum / totalArray.length).toFixed(2), totalArray] };
  }, {} as AveragePoll);

  return result;
};
