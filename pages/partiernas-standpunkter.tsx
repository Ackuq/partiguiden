import React from 'react';
import { NextPage } from 'next';
import Head from 'next/head';

import NoteIcon from '@material-ui/icons/Note';

import fetch from 'isomorphic-unfetch';

import PageTitle from '../src/components/PageTitle';

import { apiLinks } from '../src/utils';
import StandpointsList from '../src/containers/StandpointsList';

const StandpointsListContainer: NextPage<{ subjects: any }> = ({ subjects }) => (
  <>
    <Head>
      <title>Partiernas ståndpunkter | Partiguiden.nu 2.0</title>
      <meta
        name="description"
        content="Vad tar Sveriges partier för ståndpunkter i olika ämnen och sakfrågor? Jämför Sveriges partier politik och hitta det parti du sympatiserar mest med nu!"
      />
    </Head>
    <PageTitle title="Partiernas ståndpunkter" Icon={NoteIcon} />
    <StandpointsList subjects={subjects} />
  </>
);

const url = `${apiLinks.partiguidenApi}/subject`;

StandpointsListContainer.getInitialProps = async () => {
  const res = await fetch(url);
  const subjects = await res.json();

  return { subjects };
};

export default StandpointsListContainer;
