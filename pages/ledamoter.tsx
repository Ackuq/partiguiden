import React from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import PeopleIcon from '@material-ui/icons/People';

import PageTitle from '../src/components/PageTitle';
import Members from '../src/containers/Members';

const LedamoterContainer: NextPage<{ query: any }> = ({ query }) => (
  <>
    <Head>
      <title>Riksdagsledamöter | Partiguiden.nu</title>
      <meta name="description" content="" />
    </Head>
    <PageTitle title="Riksdagsledamöter" Icon={PeopleIcon} variant="h2" />
    <Members query={query} />
  </>
);

LedamoterContainer.getInitialProps = async ({ query }) => ({ query });

export default LedamoterContainer;
