import { parseArgs } from "node:util";
import { Agent, setGlobalDispatcher } from "undici";

import { writePartyData } from "@partiguiden/party-data/writer";

import scrapers from "./scrapers.ts";

/**
 * Modify the global dispatcher to allow for more concurrent requests
 */

setGlobalDispatcher(
  new Agent({
    connectTimeout: 30_000, // 30 seconds
  }),
);

const {
  values: { party, limit: limitArg, dry },
} = parseArgs({
  options: {
    party: {
      type: "string",
      short: "p",
    },
    limit: {
      type: "string",
      short: "l",
    },
    dry: {
      type: "boolean",
      default: false,
    },
  },
});

if (dry) {
  console.log("Dry run mode");
}

if (!party) {
  throw new Error("Party is not set");
}

let limit: number | undefined = undefined;
if (limitArg) {
  limit = parseInt(limitArg);
  if (Number.isNaN(limit)) {
    throw new Error(`Invalid limit argument provided: ${limitArg}`);
  }
}

const parties =
  party === "all"
    ? // TODO: V and M currently incorporates protection from bots and scrapers through Cloudflare, so scraping is not viable at the moment
      Object.keys(scrapers).filter((key) => key !== "v" && key !== "m")
    : [party];

const promises = parties.map(async (abbreviation) => {
  if (!Object.keys(scrapers).includes(abbreviation.toLowerCase())) {
    throw new Error(`No scraper created for party ${abbreviation}`);
  }

  const scraper =
    scrapers[abbreviation.toLocaleLowerCase() as keyof typeof scrapers];

  const data = await scraper.getPages(limit);

  console.log(`Number of entries: ${data.length}`);
  console.log(
    `Number of entries without content: ${
      data.filter((entry) => entry.opinions?.length === 0).length
    }`,
  );

  if (dry) {
    console.log(JSON.stringify(data, null, 2));
    return;
  }

  return writePartyData(abbreviation, data);
});

async function main() {
  const settledPromises = await Promise.allSettled(promises);
  const rejectedPromises = settledPromises.filter(
    (promise): promise is PromiseRejectedResult =>
      promise.status === "rejected",
  );
  for (const promise of rejectedPromises) {
    console.error("Error when scraping party data", promise.reason);
  }
  console.log("Done scraping party data");
}

void main();
