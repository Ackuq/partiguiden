import React from 'react';
import Head from 'next/head';
import NoteIcon from '@material-ui/icons/Note';
import PageTitle from '../src/components/PageTitle';

import PartiernasStandpunkter from '../src/containers/PartiernasStandpunkter';

const PartiernasStandpunkterContainer = () => (
  <React.Fragment>
    <Head>
      <title>Partiernas ståndpunkter | Partiguiden.nu 2.0</title>
      <meta
        name="description"
        content="Vad tar Sveriges partier för ståndpunkter i olika ämnen och sakfrågor? Jämför Sveriges partier politik och hitta det parti du sympatiserar mest med nu!"
      />
    </Head>
    <PageTitle title="Partiernas ståndpunkter" Icon={NoteIcon} />
    <PartiernasStandpunkter />
  </React.Fragment>
);

export default PartiernasStandpunkterContainer;
