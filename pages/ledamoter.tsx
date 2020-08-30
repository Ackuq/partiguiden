import React from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import PersonIcon from '@material-ui/icons/Person';

import PageTitle from '../src/components/PageTitle';
import Members from '../src/containers/Members';

const LedamoterContainer: NextPage = () => (
  <>
    <Head>
      <title>Riksdagsledamöter | Partiguiden</title>
      <meta name="description" content="" />
    </Head>
    <PageTitle title="Riksdagsledamöter" Icon={PersonIcon} variant="h2" />
    <Members />
  </>
);

export default LedamoterContainer;
