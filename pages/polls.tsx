import { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next';
import Head from 'next/head';

import { Container } from '@mui/material';
import PollIcon from '@mui/icons-material/Poll';

import moment from 'moment';

import PageTitle from '../src/components/PageTitle';
import {
  AveragePoll,
  BlocksAverage,
  createBlockAverage,
  getAverage,
  getMonthlyAverage,
  getPolls,
  getWithin,
  MonthlyAverage,
} from '../src/lib/polls';
import PollsContainer from '../src/containers/Polls';
import { ResponsiveAd } from '../src/components/Ad';

const PollsPageContainer: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  currentAverage,
  blockAverage,
  historicPolls,
}) => (
  <>
    <Head>
      <title>Opinionsundersökningar | Partiguiden</title>
      <meta
        name="description"
        content="Vad tar Sveriges partier för ståndpunkter i sakfrågor? På Partiguiden kan du hitta och jämföra vad partierns åsikter för att hitta det parti du sympatiserar mest med."
      />
    </Head>
    <PageTitle title="Opinionsundersökningar" Icon={PollIcon} />
    <Container style={{ flex: 1 }}>
      <PollsContainer
        currentAverage={currentAverage}
        blockAverage={blockAverage}
        historicPolls={historicPolls}
      />
      <ResponsiveAd />
    </Container>
  </>
);

export const getStaticProps: GetStaticProps<{
  currentAverage: AveragePoll;
  blockAverage: BlocksAverage;
  historicPolls: MonthlyAverage;
}> = async () => {
  const today = moment();
  const twoMonthsAgo = moment().subtract(2, 'months');
  const fourYearsAgo = moment().subtract(4, 'years');

  const polls = await getPolls();

  const historicPolls = getMonthlyAverage(
    getWithin(polls, fourYearsAgo.toDate(), today.toDate(), true)
  );

  const currentAverage = getAverage(getWithin(polls, twoMonthsAgo.toDate(), today.toDate()));
  const blockAverage = createBlockAverage(currentAverage);

  return {
    props: { currentAverage, blockAverage, historicPolls },
    revalidate: 518400,
  };
};

export default PollsPageContainer;
