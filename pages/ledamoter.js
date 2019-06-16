import React from 'react';
import Head from 'next/head';
import Container from '@material-ui/core/Container';
import PeopleIcon from '@material-ui/icons/People';

import PageTitle from '../src/components/PageTitle';
import Members from '../src/containers/Members';

const LedamoterContainer = () => (
  <React.Fragment>
    <Head>
      <title>Riksdagsledamöter | Partiguiden.nu</title>
      <meta name="description" content="" />
    </Head>
    <PageTitle title="Riksdagsledamöter" Icon={PeopleIcon} />
    <Container>
      <Members />
    </Container>
  </React.Fragment>
);

export default LedamoterContainer;
