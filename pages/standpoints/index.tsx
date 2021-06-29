import React from 'react';
import { NextPage, GetStaticProps, InferGetStaticPropsType } from 'next';
import Head from 'next/head';

import { Note as NoteIcon } from '@material-ui/icons';

import PageTitle from '../../src/components/PageTitle';

import StandpointsList from '../../src/containers/StandpointsList';
import { getSubjects } from '../../src/lib/api';
import { SubjectListEntry } from '../../src/types/subjects';

const StandpointsListContainer: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  subjects,
}) => (
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

export const getStaticProps: GetStaticProps<{ subjects: Array<SubjectListEntry> }> = async () => {
  const subjects = await getSubjects();

  return { props: { subjects }, revalidate: 518400 };
};

export default StandpointsListContainer;
