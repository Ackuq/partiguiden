import type {
  ParliamentYearResponse,
  ParliamentYearsResponse,
} from "../types/parliament";

const fetchParliamentYears = (): Promise<ParliamentYearsResponse> => {
  return fetch(
    "http://data.riksdagen.se/sv/koder/?typ=riksmote&utformat=json",
  ).then((res) => res.json());
};

export const getLatestParliamentYear = async (): Promise<string> => {
  const parliamentYears = await fetchParliamentYears();
  // The results is sorted in ascending order, chronologically
  const latestParliamentYear =
    parliamentYears.riksmoten.riksmote.pop() as ParliamentYearResponse;
  return latestParliamentYear.riksmote;
};

export interface MandatePeriod {
  latestParliamentYear: string;
  parliamentYears: string[];
  period: string;
}

export const getLatestMandatePeriod = async (): Promise<MandatePeriod> => {
  const parliamentYears = await fetchParliamentYears();
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
