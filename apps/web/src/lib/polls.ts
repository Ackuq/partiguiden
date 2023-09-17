import type { Blocks } from "../utils/getParties";
import { classicBlocks, newBlocks } from "../utils/getParties";
import type { PartyAbbreviation } from "../utils/parties";
import { partyAbbreviations } from "../utils/parties";
import type { Polls } from "../types/polls";

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
} as const;

const isNum = (value: string) => /^\d+$/.test(value);

/**
 * Parses CSV response of fetching poll data to our abstraction
 * @param csv CSV text string
 * @returns The data in the internal abstraction
 */
const parsePolls = (csv: string): Polls => {
  const polls: Polls = {};
  const rows = csv.split("\n");
  rows.pop();
  const header = rows.shift() as string;
  const partyOrdering = header
    .split(",")
    .slice(2, 10) as Array<PartyAbbreviation>;

  rows.forEach((row) => {
    const fields = row.split(",");

    const publishedDate = fields[13];

    const [yearString, monthString, dayString] = (
      publishedDate !== "NA" ? publishedDate.split("-") : fields[0].split("-")
    ) as [string, keyof typeof MONTH_MAP, string | undefined];

    const year = parseInt(yearString, 10);

    const month = isNum(monthString)
      ? parseInt(monthString, 10) - 1
      : MONTH_MAP[monthString];

    const day = dayString ? parseInt(dayString, 10) : null;

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
        {} as Record<PartyAbbreviation, number>,
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

const POLLS_URL =
  "https://raw.githubusercontent.com/hampusborgos/SwedishPolls/master/Data/Polls.csv";

/**
 * Fetches the poll data
 * @returns A promise with the poll data
 */
export const getPolls = (): Promise<Polls> =>
  fetch(POLLS_URL)
    .then((res) => res.text())
    .then(parsePolls);

/**
 * Filter poll data to within certain dates
 * @param polls The poll data
 * @param from The from date
 * @param to The to date
 * @param repeats Whether institutes should only have 1 entry in the output
 * @returns The filtered poll data
 */
export const getWithin = (
  polls: Polls,
  from: Date,
  to: Date,
  repeats = false,
): Polls => {
  const filtered: Polls = {};

  const usedInstitutes: Array<string> = [];

  const [fromYear, toYear] = [from.getFullYear(), to.getFullYear()];

  const addMonth = (year: number, month: number) => {
    if (polls[year]?.[month]) {
      filtered[year][month] = [];
      polls[year][month].forEach((poll) => {
        if (!usedInstitutes.includes(poll.institute) || repeats) {
          filtered[year][month].push(poll);
          usedInstitutes.push(poll.institute);
        }
      });
    }
  };

  if (fromYear === toYear) {
    const year = fromYear;
    filtered[year] = {};
    for (let month = to.getMonth(); month >= from.getMonth(); month -= 1) {
      addMonth(year, month);
    }
  } else {
    // Get recent first
    filtered[toYear] = {};
    for (let month = to.getMonth(); month >= 0; month -= 1) {
      addMonth(toYear, month);
    }

    // Get in between
    for (let year = toYear - 1; year > fromYear; year -= 1) {
      filtered[year] = {};
      for (let month = 11; month >= 0; month -= 1) {
        addMonth(year, month);
      }
    }

    // Get from from year
    filtered[fromYear] = {};
    for (let month = 11; month >= from.getMonth(); month -= 1) {
      addMonth(fromYear, month);
    }
  }
  return filtered;
};

/**
 * Convert data from object of party abbreviation to value to an array of names and values
 * @param data Object of party -> value
 * @returns Array that consists of {name, value}
 */
export const formatData = (
  data: Record<PartyAbbreviation, number>,
): Array<{ name: string; value: number }> =>
  Object.keys(data).map((name) => ({
    name,
    value: data[name as PartyAbbreviation],
  }));

export interface PollDetails {
  value: number;
  institute: string;
  published: string;
  day: number | null;
  month: number;
  year: number;
}
export type MonthlyAverage = Array<Record<string, number | string>>;

/**
 * Get the average for each month per party
 * @param polls The poll data
 * @returns The poll reduced to average monthly data
 */
export const getMonthlyAverage = (polls: Polls): MonthlyAverage => {
  const result: MonthlyAverage = [];
  Object.keys(polls).forEach((yearString) => {
    const year = parseInt(yearString, 10);
    Object.keys(polls[year]).forEach((monthString) => {
      const month = parseInt(monthString, 10);
      const data = polls[year][month];

      const pollResults: { [party: string]: number[] } = {};

      data.forEach((poll) => {
        const entries = Object.entries(poll.data);
        entries.forEach(([party, value]) => {
          if (pollResults[party]) {
            pollResults[party].push(value);
          } else {
            pollResults[party] = [value];
          }
        });
      });

      result.push(
        Object.entries(pollResults).reduce(
          (acc, [party, values]) => ({
            ...acc,
            [party as PartyAbbreviation]: parseFloat(
              (values.reduce((a, b) => a + b, 0) / values.length).toFixed(2),
            ),
          }),
          { date: `${year}-${month < 9 ? "0" : ""}${month + 1}` } as Record<
            string,
            number | string
          >,
        ),
      );
    });
  });

  return result;
};

/**
 * Helper function to sort array of poll details on date
 */
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

export type AveragePoll = Array<{
  party: PartyAbbreviation;
  value: number;
  details: Array<PollDetails>;
}>;

/**
 * Calculates the average per party of the collected poll data
 * @param polls Poll data
 * @returns
 */
export const getAverage = (polls: Polls): AveragePoll => {
  const partyAll = partyAbbreviations.reduce(
    (prev, curr) => ({ ...prev, [curr]: [] }),
    {} as Record<PartyAbbreviation, Array<PollDetails>>,
  );

  partyAbbreviations.forEach((party) => {
    partyAll[party] = [];
  });

  Object.values(polls).forEach((pollYear) => {
    Object.values(pollYear as Polls[number]).forEach((pollMonth) => {
      if (pollMonth) {
        Object.values(pollMonth).forEach((poll) => {
          Object.entries(poll.data).forEach(([party, value]) => {
            partyAll[party as PartyAbbreviation].push({
              value,
              institute: poll.institute,
              published: `${poll.day || "NA"}/${poll.month + 1}/${poll.year}`,
              day: poll.day,
              month: poll.month,
              year: poll.year,
            });
          });
        });
      }
    });
  });

  const result = Object.entries(partyAll).reduce((acc, [party, details]) => {
    const totalArray = details.sort(sortDetailArray);
    const sum = totalArray.reduce((prev, curr) => prev + curr.value, 0);
    return [
      ...acc,
      {
        party: party as PartyAbbreviation,
        value: parseFloat((sum / totalArray.length).toFixed(2)),
        details: totalArray,
      },
    ];
  }, [] as AveragePoll);

  return result;
};

type BlockAverage = Array<{
  name: Blocks["values"][number]["name"];
  value: number;
}>;

export type BlocksAverage = [BlockAverage, BlockAverage];

/**
 * Helper function to categorize the poll data into blocks
 * @param average Poll statistics for each party
 * @returns Function that categorize the data into a specific block
 */
const generateBlockAverage =
  (average: AveragePoll) =>
  (blocks: Blocks): BlockAverage => {
    return average.reduce(
      (prev, { party, value }) => {
        const blockIndex = blocks.values.findIndex((block) =>
          block.parties.includes(party),
        );
        const newAverage = prev;
        newAverage[blockIndex].value += value;
        return newAverage;
      },
      blocks.values.map((block: Blocks["values"][number]) => ({
        name: block.name,
        value: 0,
      })) as BlockAverage,
    );
  };

/**
 * Categorize the party poll data into blocks
 * @param average Poll statistics for each party
 * @returns A tuple with the data categorized using the old blocks and the new blocks, read [oldBlocks, newBlocks]
 */
export const createBlockAverage = (average: AveragePoll): BlocksAverage => {
  const getBlockAverage = generateBlockAverage(average);
  return [getBlockAverage(newBlocks), getBlockAverage(classicBlocks)];
};

// Format number to only 2 significant figures, to avoid weird values
export const displayFormatter = (value: number | string): string => {
  if (typeof value === "string") {
    return value;
  }
  return value.toFixed(2) + "%";
};
