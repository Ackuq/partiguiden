import React from 'react';
import { NextPage /* , GetStaticPaths, GetStaticProps  */ } from 'next';
import Head from 'next/head';
import { Container } from '@material-ui/core';

//import Breadcrumbs from '../../src/components/Breadcrumbs';
//import SocialMediaShare from '../../src/components/SocialMediaShare';
import PageTitle from '../../src/components/PageTitle';
//import Standpoints from '../../src/containers/Standpoints';
//import { getStandpointData, getSubject, getSubjects } from '../../src/lib/api';
import { PartySubject } from '../../src/types/party';

interface Props {
  name: string;
  partyData: Array<PartySubject>;
}

const StandPointContainer: NextPage<Props> = ({ name /* partyData */ }) => (
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
      {/* <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Breadcrumbs
          links={[
            { href: '/partiernas-standpunkter', label: 'Partiernas Ståndpunkter' },
            { href: '#', label: name },
          ]}
        />
        <SocialMediaShare title={name} />
      </div>
      <Standpoints partyData={partyData} /> */}
    </Container>
  </>
);

// export const getStaticPaths: GetStaticPaths = async () => {
//   const subjects = await getSubjects();

//   const paths = subjects.map((subject: { id: string }) => ({ params: { id: subject.id } }));

//   return { paths, fallback: false };
// };

// export const getStaticProps: GetStaticProps = async ({ params }) => {
//   const id = (Array.isArray(params?.id) ? params?.id[0] : params?.id) || '';
//   const data = await getSubject(id);
//   const partyData = await getStandpointData(data.opinions);

//   return {
//     props: { name: data.name, partyData: partyData.filter((party) => party !== null) },
//     revalidate: 518400,
//   };
//};

export default StandPointContainer;
