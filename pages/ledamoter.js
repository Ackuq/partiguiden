import React from 'react';
import Head from 'next/head';
import Members from '../components/Views/Members';

const LedamoterContainer = () => (
  <React.Fragment>
    <Head>
      <title>Riksdagsledamöter | Partiguiden.nu</title>
      <meta name="description" content="" />
    </Head>
    <div className="list-title text-center">
      <h2>Riksdagsledamöter</h2>
    </div>
    <main className="container">
      <Members />
    </main>
  </React.Fragment>
);

export default LedamoterContainer;
