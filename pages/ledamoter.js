import React from 'react';
import Head from 'next/head';
import PeopleIcon from '@material-ui/icons/People';

import Members from '../src/containers/Members';

const LedamoterContainer = () => (
  <React.Fragment>
    <Head>
      <title>Riksdagsledamöter | Partiguiden.nu</title>
      <meta name="description" content="" />
    </Head>
    <div className="list-title text-center">
      <PeopleIcon style={{ fontSize: '2.5rem' }} />
      <h2>Riksdagsledamöter</h2>
    </div>
    <main className="container">
      <Members />
    </main>
  </React.Fragment>
);

export default LedamoterContainer;
