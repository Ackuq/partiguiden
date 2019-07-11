import React from 'react';
import Head from 'next/head';
import NoteIcon from '@material-ui/icons/Note';
import fetch from 'isomorphic-unfetch';
import { array } from 'prop-types';
import PageTitle from '../src/components/PageTitle';

import { apiLinks } from '../src/utils';
import StandpointsList from '../src/containers/StandpointsList';

const PartiernasStandpunkterContainer = ({ subjects }) => (
  <React.Fragment>
    <Head>
      <title>Partiernas ståndpunkter | Partiguiden.nu 2.0</title>
      <meta
        name="description"
        content="Vad tar Sveriges partier för ståndpunkter i olika ämnen och sakfrågor? Jämför Sveriges partier politik och hitta det parti du sympatiserar mest med nu!"
      />
    </Head>
    <PageTitle title="Partiernas ståndpunkter" Icon={NoteIcon} />
    <StandpointsList subjects={subjects} />
  </React.Fragment>
);

const url = `${apiLinks.partiguidenApi}/subject`;

PartiernasStandpunkterContainer.getInitialProps = async () => {
  const res = await fetch(url);
  const subjects = await res.json();

  return { subjects };
};

PartiernasStandpunkterContainer.propTypes = {
  subjects: array.isRequired
};

export default PartiernasStandpunkterContainer;
