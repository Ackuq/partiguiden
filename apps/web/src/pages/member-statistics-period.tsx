import { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next';
import Head from 'next/head';

import PersonIcon from '@mui/icons-material/Person';

import Container from '@mui/material/Container';

import { AbsenceLeaderboard as AbsenceLeaderboardType, AbsencePeriod } from '../types/member';
import { createMemberAbsenceLeaderboard } from '../api/helpers/memberUtils';
import { getLatestMandatePeriod } from '../utils/parliamentYear';
import { membersWithAbsenceController } from '../api/controllers/members';
import AbsenceLeaderboard from '../components/MemberStatistics/AbsenceLeaderboard';
import MembersTabs from '../components/MemberStatistics/MemberTabs';
import PageTitle from '../components/PageTitle';

const MemberStatistics: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  absenceLeaderboard,
  description,
}) => (
  <>
    <Head>
      <title>Ledamotstatistik mandatperiod | Partiguiden</title>
      <meta
        name="description"
        content="Här kan du ta reda på information om ledamöterna i riksdagen, samt se vilka ledamöter är aktiva för varje parti"
      />
    </Head>
    <PageTitle marginBottom="0" title="Riksdagsledamöter" Icon={PersonIcon} />
    <MembersTabs value={2} />
    <Container>
      <AbsenceLeaderboard
        absenceLeaderboard={absenceLeaderboard}
        period={AbsencePeriod.mandatePeriod}
        description={description}
      />
    </Container>
  </>
);

export const getStaticProps: GetStaticProps<{
  absenceLeaderboard: AbsenceLeaderboardType;
  description: string;
}> = async () => {
  const latestMandatePeriod = await getLatestMandatePeriod();
  const membersMandatePeriod = await membersWithAbsenceController(
    latestMandatePeriod.parliamentYears
  );

  return {
    props: {
      absenceLeaderboard: createMemberAbsenceLeaderboard(membersMandatePeriod, 10),
      description: latestMandatePeriod.period,
    },
    revalidate: 259200,
  };
};

export default MemberStatistics;
