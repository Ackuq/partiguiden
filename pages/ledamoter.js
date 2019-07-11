import React from 'react';
import Head from 'next/head';
import PeopleIcon from '@material-ui/icons/People';
import fetch from 'isomorphic-unfetch';

import { array } from 'prop-types';
import { apiLinks } from '../src/utils';
import PageTitle from '../src/components/PageTitle';
import Members from '../src/containers/Members';

const LedamoterContainer = ({ members }) => (
  <React.Fragment>
    <Head>
      <title>Riksdagsledamöter | Partiguiden.nu</title>
      <meta name="description" content="" />
    </Head>
    <PageTitle title="Riksdagsledamöter" Icon={PeopleIcon} variant="h2" />
    <Members members={members} />
  </React.Fragment>
);

const url = `${apiLinks.partiguidenApi}/members`;

LedamoterContainer.getInitialProps = async () => {
  const res = await fetch(url);
  const data = await res.json();

  const members = await data.sort((a, b) => {
    if (a.namn > b.namn) return 1;
    if (a.namn < b.namn) return -1;
    return 0;
  });

  return { members };
};

LedamoterContainer.propTypes = {
  members: array.isRequired
};

export default LedamoterContainer;
