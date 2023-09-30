import getParliamentYears from "./get-parliament-years";
import type { ParliamentYearResponse } from "./types";

export interface MandatePeriod {
  latestParliamentYear: string;
  parliamentYears: string[];
  period: string;
}

export const getCurrentMandatePeriod = async (): Promise<MandatePeriod> => {
  const parliamentYears = await getParliamentYears();
  // The results is sorted in ascending order, chronologically
  const latestParliamentYear =
    parliamentYears.riksmoten.riksmote.pop() as ParliamentYearResponse;
  const mandatePeriod: MandatePeriod = {
    parliamentYears: [latestParliamentYear.riksmote],
    period: latestParliamentYear.mandatperiod,
    latestParliamentYear: latestParliamentYear.riksmote,
  };
  let parliamentYear =
    parliamentYears.riksmoten.riksmote.pop() as ParliamentYearResponse;
  while (parliamentYear.mandatperiod === mandatePeriod.period) {
    mandatePeriod.parliamentYears.push(parliamentYear.riksmote);
    parliamentYear =
      parliamentYears.riksmoten.riksmote.pop() as ParliamentYearResponse;
  }
  return mandatePeriod;
};
