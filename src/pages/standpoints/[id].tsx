import { NextPage, GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import Head from 'next/head';

import Container from '@mui/material/Container';

import BreadcrumbsSocialMediaShare from '../../components/BreadcrumbsSocialMediaShare/BreadcrumbsSocialMediaShare';
import PageTitle from '../../components/PageTitle';
import Standpoints from '../../containers/Standpoints';
import { getSubject, getSubjects } from '../../lib/api';
import { RelatedSubject, StandpointsMap, Subject } from '../../types/subjects';

import * as ROUTES from '../../lib/routes';

const StandPointContainer: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  name,
  standpoints,
  id,
  relatedSubjects,
}) => (
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
      <BreadcrumbsSocialMediaShare
        breadcrumbsProps={{
          links: [
            { href: ROUTES.STANDPOINTS, label: 'Partiernas Ståndpunkter' },
            { href: ROUTES.STANDPOINT, as: ROUTES.getStandpointHref(id), label: name },
          ],
        }}
        socialMediaShareProps={{ title: name }}
      />
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

export const getStaticProps: GetStaticProps<
  {
    name: string;
    standpoints: StandpointsMap;
    relatedSubjects: Array<RelatedSubject>;
    id: number;
  },
  { id: string }
> = async ({ params }) => {
  const stringId = params?.id;
  if (!stringId) {
    return { notFound: true };
  }
  const id = parseInt(stringId, 10);
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
