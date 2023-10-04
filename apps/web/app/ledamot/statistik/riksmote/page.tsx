import Container from "@components/common/container";
import PageTitle from "@components/common/page-title";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import membersWithAbsenceController from "@lib/api/member/get-members-with-absence";
import { createMemberAbsenceLeaderboard } from "@lib/api/member/utils/absence-leaderboard";
import { getCurrentParliamentYear } from "@lib/api/parliament/get-current-parliament-year";
import AbsenceLeaderboard from "../absence-leaderboard";
import { AbsencePeriod } from "@lib/api/member/types";
import MemberNavigation from "@app/ledamot/member-navigation";

export const metadata = {
  title: "Ledamotstatistik riksmöte | Partiguiden",
  description:
    "Här kan du ta reda på information om ledamöterna i riksdagen, samt se vilka ledamöter är aktiva för varje parti",
};

export default async function MemberStatisticsParliamentYear() {
  const parliamentYear = await getCurrentParliamentYear();
  const membersParliamentYear = await membersWithAbsenceController({
    parliamentYears: [parliamentYear],
  });
  const absenceLeaderboard = createMemberAbsenceLeaderboard(
    membersParliamentYear,
    10,
  );

  return (
    <main>
      <PageTitle className="mb-0" Icon={UserCircleIcon}>
        Riksdagsledamöter
      </PageTitle>
      <MemberNavigation value={1} />
      <Container>
        <AbsenceLeaderboard
          leaderboard={absenceLeaderboard}
          period={AbsencePeriod.parliamentYear}
          description={parliamentYear}
        />
      </Container>
    </main>
  );
}
