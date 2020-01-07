import React from 'react';
import Head from 'next/head';
import PeopleIcon from '@material-ui/icons/People';
import { object } from 'prop-types';

import PageTitle from '../src/components/PageTitle';
import Members from '../src/containers/Members';

const LedamoterContainer = ({ query }) => (
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

LedamoterContainer.propTypes = {
  query: object.isRequired,
};

export default LedamoterContainer;
