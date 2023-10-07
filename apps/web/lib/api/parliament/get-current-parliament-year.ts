import getParliamentYears from "./get-parliament-years";
import type { RiksmoteItem } from "./types";

export const getCurrentParliamentYear = async (): Promise<string> => {
  const parliamentYears = await getParliamentYears();
  // The results is sorted in ascending order, chronologically
  const latestParliamentYear =
    parliamentYears.riksmoten.riksmote.pop() as RiksmoteItem;
  return latestParliamentYear.riksmote;
};
