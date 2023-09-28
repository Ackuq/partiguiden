import getParliamentYears from "./get-parliament-years";
import type { ParliamentYearResponse } from "./types";

export const getCurrentParliamentYear = async (): Promise<string> => {
  const parliamentYears = await getParliamentYears();
  // The results is sorted in ascending order, chronologically
  const latestParliamentYear =
    parliamentYears.riksmoten.riksmote.pop() as ParliamentYearResponse;
  return latestParliamentYear.riksmote;
};
