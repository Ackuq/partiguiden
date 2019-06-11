import React from 'react';
import Head from 'next/head';
import NoteIcon from '@material-ui/icons/Note';

import PartiernasStandpunkter from '../components/Views/PartiernasStandpunkter';

const PartiernasStandpunkterContainer = () => (
  <React.Fragment>
    <Head>
      <title>Partiernas ståndpunkter | Partiguiden.nu 2.0</title>
      <meta
        name="description"
        content="Vad tar Sveriges partier för ståndpunkter i olika ämnen och sakfrågor? Jämför Sveriges partier politik och hitta det parti du sympatiserar mest med nu!"
      />
    </Head>
    <div className="list-title">
      <NoteIcon style={{ fontSize: '2.5rem' }} />
      <h1>Partiernas ståndpunkter</h1>
    </div>
    <main>
      <PartiernasStandpunkter />
    </main>
  </React.Fragment>
);

export default PartiernasStandpunkterContainer;
