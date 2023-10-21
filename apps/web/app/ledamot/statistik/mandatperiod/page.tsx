import { UserCircleIcon } from "@heroicons/react/24/solid";

import MemberNavigation from "@app/ledamot/components/member-navigation";
import Container from "@components/common/container";
import PageTitle from "@components/common/page-title";
import membersWithAbsenceController from "@lib/api/member/get-members-with-absence";
import { AbsencePeriod } from "@lib/api/member/types";
import { createMemberAbsenceLeaderboard } from "@lib/api/member/utils/absence-leaderboard";
import { getCurrentMandatePeriod } from "@lib/api/parliament/get-current-mandate-period";

import AbsenceLeaderboard from "../absence-leaderboard";

export const metadata = {
  title: "Ledamotstatistik mandatperiod | Partiguiden",
  description:
    "Här kan du ta reda på information om ledamöterna i riksdagen, samt se vilka ledamöter är aktiva för varje parti",
};

export default async function MemberStatisticsParliamentYear() {
  const latestMandatePeriod = await getCurrentMandatePeriod();
  const membersMandatePeriod = await membersWithAbsenceController({
    parliamentYears: latestMandatePeriod.parliamentYears,
  });
  const absenceLeaderboard = createMemberAbsenceLeaderboard(
    membersMandatePeriod,
    10,
  );

  return (
    <main>
      <PageTitle className="mb-0" Icon={UserCircleIcon}>
        Riksdagsledamöter
      </PageTitle>
      <MemberNavigation value={2} />
      <Container>
        <AbsenceLeaderboard
          leaderboard={absenceLeaderboard}
          period={AbsencePeriod.mandatePeriod}
          description={latestMandatePeriod.period}
        />
      </Container>
    </main>
  );
}
