import * as fs from "node:fs";
import type { PartyData, PartyDataWithoutPartyName, Standpoint } from "./types";

const PARTIES_DIRECTORY = `${__dirname}/parties`;

const partyFileName = (abbreviation: string) =>
  `${PARTIES_DIRECTORY}/${abbreviation.toLocaleUpperCase()}.json`;

/**
 * Function to append, update, or delete party data, with a new snapshot.
 */
export function writePartyData(
  abbreviation: string,
  list: PartyDataWithoutPartyName[],
) {
  const data = list.reduce((prev, current) => {
    const entry: PartyData[string] = {
      ...current,
      party: abbreviation,
    };
    return {
      ...prev,
      [current.url]: entry,
    };
  }, {} as PartyData);
  const fileName = partyFileName(abbreviation);

  if (!fs.existsSync(fileName)) {
    fs.writeFileSync(fileName, JSON.stringify(data, null, 2) + "\n");
    return;
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
  fs.writeFileSync(fileName, JSON.stringify(storedData, null, 2) + "\n");
}

export function updateStandpoint(abbreviation: string, standpoint: Standpoint) {
  const fileName = partyFileName(abbreviation);
  const storedData = JSON.parse(
    fs.readFileSync(fileName).toString(),
  ) as PartyData;
  storedData[standpoint.url] = standpoint;
  fs.writeFileSync(fileName, JSON.stringify(storedData, null, 2) + "\n");
}
