import React from 'react';
import { NextPage, GetStaticProps } from 'next';
import Head from 'next/head';

import NoteIcon from '@material-ui/icons/Note';

import PageTitle from '../src/components/PageTitle';

import StandpointsList from '../src/containers/StandpointsList';
import { getSubjects } from '../src/lib/api';
import { StandpointData } from '../src/types/standpoints';

interface Props {
  subjects: Array<StandpointData>;
}

const StandpointsListContainer: NextPage<Props> = ({ subjects }) => (
  <>
    <Head>
      <title>Partiernas ståndpunkter | Partiguiden 2.0</title>
      <meta
        name="description"
        content="Vad tar Sveriges partier för ståndpunkter i olika ämnen och sakfrågor? Jämför Sveriges partier politik och hitta det parti du sympatiserar mest med nu!"
      />
    </Head>
    <PageTitle title="Partiernas ståndpunkter" Icon={NoteIcon} />
    <StandpointsList subjects={subjects} />
  </>
);

export const getStaticProps: GetStaticProps = async () => {
  const subjects = await getSubjects();

  return { props: { subjects } };
};

export default StandpointsListContainer;
