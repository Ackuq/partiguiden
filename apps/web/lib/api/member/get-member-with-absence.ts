import type { MemberDetailedResponse } from "./types";
import getAbsence from "./get-absence";
import getMember from "./get-member";
import { getCurrentMandatePeriod } from "../parliament/get-current-mandate-period";

export default async function getMemberWithAbsence(
  id: string,
): Promise<MemberDetailedResponse | null> {
  // Get latest parliament year and mandate period
  const mandatePeriod = await getCurrentMandatePeriod();

  const memberPromise = getMember(id);
  const absenceParliamentYearPromise = getAbsence({
    id,
    parliamentYears: [mandatePeriod.latestParliamentYear],
  });
  const absenceMandatePeriodPromise = getAbsence({
    id,
    parliamentYears: mandatePeriod.parliamentYears,
  });

  const [memberData, absenceParliamentYear, absenceMandatePeriod] =
    await Promise.all([
      memberPromise,
      absenceParliamentYearPromise,
      absenceMandatePeriodPromise,
    ]);

  if (!memberData) {
    return null;
  }

  return {
    ...memberData,
    absence: {
      mandatePeriod: {
        value: absenceMandatePeriod,
        description: mandatePeriod.period,
      },
      parliamentYear: {
        value: absenceParliamentYear,
        description: mandatePeriod.latestParliamentYear,
      },
    },
  };
}
