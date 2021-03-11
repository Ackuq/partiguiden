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

const isNum = (value: string) => /^\d+$/.test(value);

const parsePolls = (data: string): Polls => {
  const polls: Polls = {};
  const rows = data.split('\n');
  rows.pop();
  const header = rows.shift() as string;
  const partyOrdering = header.split(',').slice(2, 10) as Array<partyAbbrev>;

  rows.forEach((row) => {
    const fields = row.split(',');

    const publishedDate = fields[13];

    const [yearString, monthString, dayString] = (publishedDate !== 'NA'
      ? publishedDate.split('-')
      : fields[0].split('-')) as [string, keyof typeof MONTH_MAP, string | undefined];

    const year = parseInt(yearString);

    const month = isNum(monthString) ? parseInt(monthString) - 1 : MONTH_MAP[monthString];

    const day = dayString ? parseInt(dayString) : null;

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
      year,
      month,
      day,
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

export const getWithin = (polls: Polls, from: Date, to: Date, repeats = false): Polls => {
  const filtered: Polls = {};

  const usedInstitutes: Array<string> = [];

  const [fromYear, toYear] = [from.getFullYear(), to.getFullYear()];

  const addMonth = (year: number, month: number) => {
    filtered[year][month] = [];
    polls[year][month].forEach((poll) => {
      if (!usedInstitutes.includes(poll.institute) || repeats) {
        filtered[year][month].push(poll);
        usedInstitutes.push(poll.institute);
      }
    });
  };

  if (fromYear === toYear) {
    const year = fromYear;
    filtered[year] = {};
    for (let month = to.getMonth(); month >= from.getMonth(); month--) {
      addMonth(year, month);
    }
  } else {
    // Get recents first
    filtered[toYear] = {};
    for (let month = to.getMonth(); month >= 0; month--) {
      addMonth(toYear, month);
    }

    // Get in between
    for (let year = toYear - 1; year > fromYear; year--) {
      filtered[year] = {};
      for (let month = 11; month <= 0; month--) {
        addMonth(year, month);
      }
    }

    // Get from from year
    filtered[fromYear] = {};
    for (let month = 11; month <= from.getMonth(); month--) {
      addMonth(fromYear, month);
    }
  }
  return filtered;
};

export const formatData = (
  data: Record<partyAbbrev, number>
): Array<{ name: string; value: number }> =>
  Object.keys(data).map((name) => ({ name, value: data[name as partyAbbrev] }));

export interface PollDetails {
  value: number;
  institute: string;
  published: string;
  day: number | null;
  month: number;
  year: number;
}

export type AveragePoll = Record<partyAbbrev, [number, Array<PollDetails>]>;

export const getAverage = (polls: Polls): AveragePoll => {
  const partyAll = partyAbbreviations.reduce(
    (prev, curr) => ({ ...prev, [curr]: [] }),
    {} as Record<partyAbbrev, Array<PollDetails>>
  );

  for (const party of partyAbbreviations) {
    partyAll[party] = [];
  }

  for (const pollYear of Object.values(polls)) {
    for (const pollMonth of Object.values(pollYear as Polls[number])) {
      if (pollMonth) {
        for (const poll of Object.values(pollMonth)) {
          for (const [party, value] of Object.entries(poll.data)) {
            partyAll[party as partyAbbrev].push({
              value,
              institute: poll.institute,
              published: `${poll.day || 'NA'}/${poll.month + 1}/${poll.year}`,
              day: poll.day,
              month: poll.month,
              year: poll.year,
            });
          }
        }
      }
    }
  }

  const result = Object.keys(partyAll).reduce((acc, party) => {
    const totalArray = partyAll[party as partyAbbrev].sort(sortDetailArray);
    const sum = totalArray.reduce((prev, curr) => prev + curr.value, 0);
    return { ...acc, [party]: [(sum / totalArray.length).toFixed(2), totalArray] };
  }, {} as AveragePoll);

  return result;
};

export const sortDetailArray = (a: PollDetails, b: PollDetails): number => {
  if (a.year > b.year) {
    return -1;
  }
  if (a.year < b.year) {
    return 1;
  }
  if (a.month > b.month) {
    return -1;
  }
  if (a.month < b.month) {
    return 1;
  }
  if (a.day !== null && b.day !== null) {
    if (a.day > b.day) {
      return -1;
    }
    if (a.day < b.day) {
      return 1;
    }
  }
  return 0;
};
