import getParliamentYears from "./get-parliament-years";

interface MandatePeriod {
  latestParliamentYear: string;
  parliamentYears: string[];
  period: string;
}

export const getCurrentMandatePeriod = async (): Promise<MandatePeriod> => {
  const parliamentYears = await getParliamentYears();
  // The results is sorted in ascending order, chronologically
  const latestParliamentYear = parliamentYears.riksmoten.riksmote.pop()!;
  const mandatePeriod: MandatePeriod = {
    parliamentYears: [latestParliamentYear.riksmote],
    period: latestParliamentYear.mandatperiod,
    latestParliamentYear: latestParliamentYear.riksmote,
  };
  let parliamentYear = parliamentYears.riksmoten.riksmote.pop()!;
  while (parliamentYear.mandatperiod === mandatePeriod.period) {
    mandatePeriod.parliamentYears.push(parliamentYear.riksmote);
    parliamentYear = parliamentYears.riksmoten.riksmote.pop()!;
  }
  return mandatePeriod;
};
