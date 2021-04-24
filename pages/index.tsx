import React from 'react';
import { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { Theme } from '@material-ui/core';

import styled from '@material-ui/styles/styled';

import Typed from 'react-typed';

import FrontPage from '../src/containers/FrontPage';
import { getPopular } from '../src/lib/api';
import { SubjectListEntry } from '../src/types/subjects';

const PageTitleContainer = styled(Paper)(({ theme }: { theme: Theme }) => ({
  backgroundColor:
    theme.palette.type === 'dark' ? theme.palette.background.paper : theme.palette.primary.light,
  textAlign: 'center',
  padding: '1.5rem 0.25rem',
  marginBottom: '1rem',
  color: '#fff',
  minHeight: '5rem',
}));

interface Props {
  popular: Array<SubjectListEntry>;
}

const FrontPageContainer: NextPage<Props> = ({ popular }) => (
  <>
    <Head>
      <title>Partiguiden | Rösta rätt</title>
      <meta
        name="description"
        content="Vad tar Sveriges partier för ståndpunkter i sakfrågor? På Partiguiden kan du hitta och jämföra vad partierns åsikter för att hitta det parti du sympatiserar mest med."
      />
    </Head>
    <PageTitleContainer square>
      <Typography variant="h4" paragraph>
        Hur vill Sveriges partier förbättra
      </Typography>
      <Typography variant="h4">
        <Typed
          strings={['miljön?', 'jämlikheten?', 'vården?', 'Sverige?']}
          typeSpeed={100}
          showCursor={false}
        />
        &nbsp;
      </Typography>
    </PageTitleContainer>
    <Container>
      <FrontPage popular={popular} />
    </Container>
  </>
);

export const getStaticProps: GetStaticProps = async () => {
  const data = await getPopular();
  const popular = data.slice(0, 4).map((el) => el[0]);

  return {
    props: { popular },
    revalidate: 518400,
  };
};

export default FrontPageContainer;
