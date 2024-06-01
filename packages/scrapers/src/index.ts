import { parseArgs } from "node:util";

import { writePartyData } from "@partiguiden/party-data/writer";

import scrapers from "./scrapers";

const {
  values: { party },
} = parseArgs({
  options: {
    party: {
      type: "string",
      short: "p",
    },
  },
});

if (!party) {
  throw new Error("Party is not set");
}

const parties = party === "all" ? Object.keys(scrapers) : [party];

// eslint-disable-next-line @typescript-eslint/no-misused-promises
parties.forEach(async (abbreviation) => {
  if (!Object.keys(scrapers).includes(abbreviation.toLowerCase())) {
    throw new Error(`No scraper created for party ${abbreviation}`);
  }

  const scraper =
    scrapers[abbreviation.toLocaleLowerCase() as keyof typeof scrapers];

  const data = await scraper.getPages();

  console.log(`Number of entries: ${data.length}`);
  console.log(
    `Number of entries without content: ${
      data.filter((entry) => entry.opinions.length === 0).length
    }`,
  );

  writePartyData(abbreviation, data);
});
