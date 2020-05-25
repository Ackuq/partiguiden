import React from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import Container from '@material-ui/core/Container';

import FrontPage from '../src/containers/FrontPage';
import Typed from '../src/containers/FrontPage/Typed';

const FrontPageContainer: NextPage = () => (
  <>
    <Head>
      <title>Partiguiden | Rösta rätt</title>
      <meta
        name="description"
        content="Vad tar Sveriges partier för ståndpunkter i sakfrågor? På Partiguiden kan du hitta och jämföra vad partierns åsikter för att hitta det parti du sympatiserar mest med."
      />
    </Head>
    <Typed />
    <Container>
      <FrontPage />
    </Container>
  </>
);

export default FrontPageContainer;
