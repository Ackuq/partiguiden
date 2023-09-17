import { parseArgs } from "node:util";
import scrapers from "./scrapers";
import { writePartyData } from "@partiguiden/party-data";

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
