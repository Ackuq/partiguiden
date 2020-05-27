import React from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { Theme } from '@material-ui/core';

import styled from '@material-ui/styles/styled';

import Typed from 'react-typed';

import FrontPage from '../src/containers/FrontPage';

const PageTitleContainer = styled(Paper)(({ theme }: { theme: Theme }) => ({
  backgroundColor: theme.palette.primary.light,
  textAlign: 'center',
  padding: '1.5rem 0.25rem',
  marginBottom: '1rem',
  color: '#fff',
  minHeight: '5rem',
}));

const FrontPageContainer: NextPage = () => (
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
      <FrontPage />
    </Container>
  </>
);

export default FrontPageContainer;
