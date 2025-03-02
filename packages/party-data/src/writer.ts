import * as fs from "node:fs";
import * as prettier from "prettier";

import type {
  PartyData,
  PartyDataWithoutPartyName,
  Standpoint,
} from "./types.ts";

const PARTIES_DIRECTORY = `${import.meta.dirname}/data/parties`;

const partyFileName = (abbreviation: string) =>
  `${PARTIES_DIRECTORY}/${abbreviation.toLocaleUpperCase()}.json`;

/**
 * Function to append, update, or delete party data, with a new snapshot.
 */
export async function writePartyData(
  abbreviation: string,
  list: PartyDataWithoutPartyName[],
): Promise<string> {
  const data = list.reduce((prev, current) => {
    const entry: PartyData[string] = {
      ...current,
      party: abbreviation.toLocaleUpperCase(),
    };
    return {
      ...prev,
      [current.url]: entry,
    };
  }, {} as PartyData);
  const fileName = partyFileName(abbreviation);

  if (!fs.existsSync(fileName)) {
    await writeJSON(fileName, data);
    return fileName;
  }
  const storedData = JSON.parse(
    fs.readFileSync(fileName).toString(),
  ) as PartyData;

  // Delete removed data
  const oldLinks = Object.keys(storedData);
  const newLinks = Object.keys(data);
  const removedLinks = oldLinks.filter((link) => !(link in data));
  for (const link of removedLinks) {
    delete storedData[link];
  }
  // Add new data
  const addedLinks = newLinks.filter((link) => !(link in storedData));
  for (const link of addedLinks) {
    storedData[link] = data[link];
  }
  // Mutate existing data
  const existingLinks = newLinks.filter((link) => link in storedData);
  for (const link of existingLinks) {
    const incomingData = data[link];
    const result = { ...storedData[link] };
    if (
      JSON.stringify(incomingData.opinions) ===
        JSON.stringify(result.opinions) &&
      result.title === incomingData.title
    ) {
      // Nothing has changed, continue
      continue;
    }
    result.opinions = incomingData.opinions;
    result.title = incomingData.title;
    result.fetchDate = incomingData.fetchDate;
    storedData[link] = result;
  }
  await writeJSON(fileName, storedData);
  return fileName;
}

export async function updateStandpoint(
  abbreviation: string,
  standpoint: Standpoint,
) {
  const fileName = partyFileName(abbreviation);
  const storedData = JSON.parse(
    fs.readFileSync(fileName).toString(),
  ) as PartyData;
  storedData[standpoint.url] = standpoint;
  await writeJSON(fileName, storedData);
}

async function writeJSON(fileName: string, data: unknown) {
  const json = JSON.stringify(data);
  const formattedData = await prettier.format(json, { parser: "json" });
  fs.writeFileSync(fileName, formattedData);
}
