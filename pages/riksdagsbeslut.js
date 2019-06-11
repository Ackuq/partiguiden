import React from 'react';
import Head from 'next/head';

import Riksdagsbeslut from '../components/Views/Riksdagsbeslut';

const RiksdagsbeslutContainer = () => (
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
    <main>
      <Riksdagsbeslut />
    </main>
  </React.Fragment>
);

export default RiksdagsbeslutContainer;
