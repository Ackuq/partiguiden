import React from 'react';
/* Next.js Head component */
import Head from 'next/head';
import { withRouter } from 'next/router';

import RiksdagsbeslutListContainer from './components/RiksdagsbeslutList';

const Riksdagsbeslut = ({ router }) => (
  <React.Fragment>
    <Head>
      <title>Riksdagsbeslut | Partiguiden.nu</title>
      <meta
        name="description"
        content="Vad tar riksdagen för beslut? Här hittar du en sammanfattning på de senaste besluten som tas upp i riksdagen."
      />
    </Head>
    <div className="list-title text-center">
      <h1>Riksdagsbeslut</h1>
    </div>
    <div className="container">
      <RiksdagsbeslutListContainer query={router.query} asPath={router.asPath} page={1} />
    </div>
  </React.Fragment>
);

export default withRouter(Riksdagsbeslut);
