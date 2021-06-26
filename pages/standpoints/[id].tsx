import React from 'react';
import { NextPage, GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import { Container } from '@material-ui/core';

import Breadcrumbs from '../../src/components/Breadcrumbs';
import SocialMediaShare from '../../src/components/SocialMediaShare';
import PageTitle from '../../src/components/PageTitle';
import Standpoints from '../../src/containers/Standpoints';
import { getSubject, getSubjects } from '../../src/lib/api';
import { RelatedSubject, StandpointsMap, Subject } from '../../src/types/subjects';
import * as ROUTES from '../../src/lib/routes';

interface Props {
  name: string;
  standpoints: StandpointsMap;
  relatedSubjects: Array<RelatedSubject>;
  id: number;
}

const StandPointContainer: NextPage<Props> = ({ name, standpoints, id, relatedSubjects }) => (
  <>
    <Head>
      <title>{name} | Ämne | Partiguiden</title>
      <meta
        name="description"
        content={`Vad tar Sveriges partier för ståndpunkter inom ämnet ${name} Här hittar du informationen du behöver för att kunna jämföra och hitta det parti du sympatiserar med mest! `}
      />
    </Head>
    <PageTitle title={name} />
    <Container>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Breadcrumbs
          links={[
            { href: ROUTES.STANDPOINTS, label: 'Partiernas Ståndpunkter' },
            { href: ROUTES.STANDPOINT, as: ROUTES.getStandpointHref(id), label: name },
          ]}
        />
        <SocialMediaShare title={name} />
      </div>
      <Standpoints relatedSubjects={relatedSubjects} standpoints={standpoints} />
    </Container>
  </>
);

export const getStaticPaths: GetStaticPaths = async () => {
  const subjects = await getSubjects();

  const paths = subjects.map((subject: { id: number }) => ({
    params: { id: subject.id.toString() },
  }));

  return { paths, fallback: false };
};

const createPartyMap = (subject: Subject): StandpointsMap => {
  return subject.standpoints.reduce((prev, curr) => {
    if (curr.party in prev) {
      return { ...prev, [curr.party]: [...prev[curr.party], curr] };
    }
    return { ...prev, [curr.party]: [curr] };
  }, {} as StandpointsMap);
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const id = parseInt(params?.id as string, 10);
  const data = await getSubject(id);

  return {
    props: {
      name: data.name,
      standpoints: createPartyMap(data),
      relatedSubjects: data.related_subjects,
      id,
    },
    revalidate: 518400,
  };
};

export default StandPointContainer;
