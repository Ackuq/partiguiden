import type { Party } from "@partiguiden/party-data/types";

import type { Polls } from "../types";

enum CSVIndex {
  Institute = 1,
  PartyStart = 2,
  PartyEnd = 10,
  PublicationDate = 14,
}

type RowDate = `${number}-${number}-${number}`;

type Fields = [
  string, // Publication year month
  string, // Institute
  string, // M
  string, // L
  string, // C
  string, // KD
  string, // S
  string, // V
  string, // MP
  string, // SD
  string, // FI, ignore
  string, // Uncertain
  string, // n
  RowDate, // Publication date
  RowDate, // From date
  RowDate, // To date
  "FALSE" | "TRUE", // Approximate period
  string, // House
];

export default function parsePolls(csv: string, lastDate: Date): Polls {
  const polls: Polls = {};
  const rows = csv.split("\n");
  const lastYear = lastDate.getFullYear();
  const lastMonth = lastDate.getMonth();

  const header = rows.shift()!;
  const partyOrder = header
    .split(",")
    .slice(CSVIndex.PartyStart, CSVIndex.PartyEnd) as Party[];

  for (const row of rows) {
    const fields = row.split(",") as Fields;

    const [yearString, monthString] =
      fields[CSVIndex.PublicationDate].split("-");
    const year = parseInt(yearString);
    const month = parseInt(monthString) - 1;

    if ((year === lastYear && month < lastMonth) || year < lastYear) {
      break;
    }

    if (!polls[year]) {
      polls[year] = {};
    }
    if (!polls[year][month]) {
      polls[year][month] = [];
    }
    const partyRows = fields.slice(CSVIndex.PartyStart, CSVIndex.PartyEnd);
    const data = partyRows.reduce<Partial<Record<Party, number>>>(
      (prev, current, index) => {
        const value = parseFloat(current);
        if (Number.isNaN(value)) {
          return prev;
        }
        return {
          ...prev,
          [partyOrder[index]]: value,
        };
      },
      {},
    );
    polls[year][month].push({
      data,
      publishedDate: new Date(fields[CSVIndex.PublicationDate]),
      institute: fields[CSVIndex.Institute],
    });
  }

  return polls;
}
