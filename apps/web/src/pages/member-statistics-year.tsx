import type { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import Head from "next/head";

import PersonIcon from "@mui/icons-material/Person";

import Container from "@mui/material/Container";

import type { AbsenceLeaderboard as AbsenceLeaderboardType } from "../types/member";
import { AbsencePeriod } from "../types/member";
import { createMemberAbsenceLeaderboard } from "../api/helpers/memberUtils";
import { getLatestParliamentYear } from "../utils/parliamentYear";
import { membersWithAbsenceController } from "../api/controllers/members";
import AbsenceLeaderboard from "../components/MemberStatistics/AbsenceLeaderboard";
import MembersTabs from "../components/MemberStatistics/MemberTabs";
import PageTitle from "../components/PageTitle";

const MemberStatistics: NextPage<
  InferGetStaticPropsType<typeof getStaticProps>
> = ({ absenceLeaderboard, description }) => (
  <>
    <Head>
      <title>Ledamotstatistik riksmöte | Partiguiden</title>
      <meta
        name="description"
        content="Här kan du ta reda på information om ledamöterna i riksdagen, samt se vilka ledamöter är aktiva för varje parti"
      />
    </Head>
    <PageTitle marginBottom="0" title="Riksdagsledamöter" Icon={PersonIcon} />
    <MembersTabs value={1} />
    <Container>
      <AbsenceLeaderboard
        absenceLeaderboard={absenceLeaderboard}
        period={AbsencePeriod.parliamentYear}
        description={description}
      />
    </Container>
  </>
);

export const getStaticProps: GetStaticProps<{
  absenceLeaderboard: AbsenceLeaderboardType;
  description: string;
}> = async () => {
  const latestParliamentYear = await getLatestParliamentYear();
  const membersParliamentYear = await membersWithAbsenceController([
    latestParliamentYear,
  ]);

  return {
    props: {
      absenceLeaderboard: createMemberAbsenceLeaderboard(
        membersParliamentYear,
        10,
      ),
      description: latestParliamentYear,
    },
    revalidate: 259200,
  };
};

export default MemberStatistics;
