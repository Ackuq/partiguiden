import React from 'react';
import InfoIcon from '@material-ui/icons/Info';
import Head from 'next/head';

import OmOss from '../components/Views/OmOss';

const OmOssContainer = () => (
  <React.Fragment>
    <Head>
      <title>Om oss | Partiguiden.nu</title>
      <meta
        name="description"
        content="Partiguiden.nu erbjuder en platform där du kan jämföra vad olika partier tycker i sakfrågor för att det ska bli lättare att hitta det parti du sympatiserar med mest."
      />
    </Head>
    <div className="list-title text-center">
      <InfoIcon style={{ fontSize: '2.5rem' }} />
      <h1>Om oss</h1>
    </div>
    <main className="container">
      <OmOss />
    </main>
  </React.Fragment>
);

export default OmOssContainer;
