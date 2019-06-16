import React from 'react';
import AnnouncementIcon from '@material-ui/icons/Announcement';
import Head from 'next/head';
import Container from '@material-ui/core/Container';

import PageTitle from '../src/components/PageTitle';
import CookiePolicy from '../src/containers/CookiePolicy';

const CookiePolicyContainer = () => (
  <React.Fragment>
    <Head>
      <title>Kakpolicy | Partiguiden.nu</title>
      <meta
        name="description"
        content="Partiguiden.nu erbjuder en platform där du kan jämföra vad olika partier tycker i sakfrågor för att det ska bli lättare att hitta det parti du sympatiserar med mest."
      />
    </Head>
    <PageTitle title="Kakpolicy" Icon={AnnouncementIcon} />
    <Container>
      <CookiePolicy />
    </Container>
  </React.Fragment>
);

export default CookiePolicyContainer;
