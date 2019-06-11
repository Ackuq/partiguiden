import React from 'react';
import Head from 'next/head';

import FrontPage from '../components/Views/FrontPage';
import { Typed } from '../components/Views/FrontPage/components';

const FrontPageContainer = () => (
  <React.Fragment>
    <Head>
      <title>Partiguiden.nu | Rösta rätt</title>
      <meta
        name="description"
        content="Vad tar Sveriges partier för ståndpunkter i sakfrågor? På Partiguiden kan du hitta och jämföra vad partierns åsikter för att hitta det parti du sympatiserar mest med."
      />
    </Head>
    <Typed />
    <main className="container">
      <FrontPage />
    </main>
  </React.Fragment>
);

export default FrontPageContainer;
