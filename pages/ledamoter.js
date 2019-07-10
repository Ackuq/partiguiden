import React from 'react';
import Head from 'next/head';
import PeopleIcon from '@material-ui/icons/People';

import PageTitle from '../src/components/PageTitle';
import Members from '../src/containers/Members';

const LedamoterContainer = () => (
  <React.Fragment>
    <Head>
      <title>Riksdagsledamöter | Partiguiden.nu</title>
      <meta name="description" content="" />
    </Head>
    <PageTitle title="Riksdagsledamöter" Icon={PeopleIcon} variant="h2" />
    <Members />
  </React.Fragment>
);

export default LedamoterContainer;
