import getParliamentYears from "./get-parliament-years";
import type { RiksmoteItem } from "./types";

interface MandatePeriod {
  latestParliamentYear: string;
  parliamentYears: string[];
  period: string;
}

export const getCurrentMandatePeriod = async (): Promise<MandatePeriod> => {
  const parliamentYears = await getParliamentYears();
  // The results is sorted in ascending order, chronologically
  const latestParliamentYear =
    parliamentYears.riksmoten.riksmote.pop() as RiksmoteItem;
  const mandatePeriod: MandatePeriod = {
    parliamentYears: [latestParliamentYear.riksmote],
    period: latestParliamentYear.mandatperiod,
    latestParliamentYear: latestParliamentYear.riksmote,
  };
  let parliamentYear = parliamentYears.riksmoten.riksmote.pop() as RiksmoteItem;
  while (parliamentYear.mandatperiod === mandatePeriod.period) {
    mandatePeriod.parliamentYears.push(parliamentYear.riksmote);
    parliamentYear = parliamentYears.riksmoten.riksmote.pop() as RiksmoteItem;
  }
  return mandatePeriod;
};
