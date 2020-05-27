import React from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import { Container } from '@material-ui/core';

import Breadcrumbs from '../../src/components/Breadcrumbs';
import SocialMediaShare from '../../src/components/SocialMediaShare';
import PageTitle from '../../src/components/PageTitle';
import Standpoints from '../../src/containers/Standpoints';
import { getStandpointData, getSubject } from '../../src/lib/api';

interface Props {
  name: string;
  partyData: Array<any>;
}

const StandPointContainer: NextPage<Props> = ({ name, partyData }) => (
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
            { href: '/partiernas-standpunkter', label: 'Partiernas Ståndpunkter' },
            { href: '#', label: name },
          ]}
        />
        <SocialMediaShare title={name} />
      </div>
      <Standpoints partyData={partyData} />
    </Container>
  </>
);

StandPointContainer.getInitialProps = async ({ query }) => {
  const id = Array.isArray(query.id) ? query.id[0] : query.id || '';
  const data = await getSubject(id);
  const partyData = await getStandpointData(data.opinions);

  return { name: data.name, partyData: partyData.filter((party) => party !== null) };
};

export default StandPointContainer;
