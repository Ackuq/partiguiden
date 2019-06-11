import React from 'react';
import AnnouncementIcon from '@material-ui/icons/Announcement';
import Head from 'next/head';
import CookiePolicy from '../components/Views/CookiePolicy';

const CookiePolicyContainer = () => (
  <React.Fragment>
    <Head>
      <title>Kakpolicy | Partiguiden.nu</title>
      <meta
        name="description"
        content="Partiguiden.nu erbjuder en platform där du kan jämföra vad olika partier tycker i sakfrågor för att det ska bli lättare att hitta det parti du sympatiserar med mest."
      />
    </Head>
    <div className="list-title text-center">
      <AnnouncementIcon style={{ fontSize: '2.5rem' }} />
      <h1>Kakpolicy</h1>
    </div>
    <main className="container">
      <CookiePolicy />
    </main>
  </React.Fragment>
);

export default CookiePolicyContainer;
