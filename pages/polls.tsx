import React from 'react';
import { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import PageTitle from '../src/components/PageTitle';
import { getPolls } from '../src/lib/polls';
import { Polls } from '../src/types/polls';
import PollsContainer from '../src/containers/Polls';
import { Container } from '@material-ui/core';

interface Props {
  polls: Polls;
}

const PollsPageContainer: NextPage<Props> = ({ polls }) => (
  <>
    <Head>
      <title>Opinionsundersökningar | Partiguiden</title>
      <meta
        name="description"
        content="Vad tar Sveriges partier för ståndpunkter i sakfrågor? På Partiguiden kan du hitta och jämföra vad partierns åsikter för att hitta det parti du sympatiserar mest med."
      />
    </Head>
    <PageTitle title="Opinionsundersökningar" />
    <Container style={{ flex: 1 }}>
      <PollsContainer polls={polls} />
    </Container>
  </>
);

export const getStaticProps: GetStaticProps = async () => {
  const polls = await getPolls();

  return {
    props: { polls },
    revalidate: 518400,
  };
};

export default PollsPageContainer;
