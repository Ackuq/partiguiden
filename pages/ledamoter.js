import React from 'react';
import Head from 'next/head';
import Ledamoter from '../components/Views/Ledamoter';

const LedamoterContainer = () => (
  <React.Fragment>
    <Head>
      <title>Riksdgsledamöter | Partiguiden.nu</title>
      <meta name="description" content="" />
    </Head>
    <div className="list-title text-center">
      <h2>Riksdgsledamöter</h2>
    </div>
    <main className="container">
      <Ledamoter />
    </main>
  </React.Fragment>
);

export default LedamoterContainer;
