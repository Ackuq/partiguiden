import React from 'react';
import Head from 'next/head';
import { Container } from '@material-ui/core';
import { string, array } from 'prop-types';
import fetch from 'isomorphic-unfetch';

import Breadcrumbs from '../../src/components/Breadcrumbs';
import { apiLinks } from '../../src/utils';
import SocialMediaShare from '../../src/components/SocialMediaShare';
import PageTitle from '../../src/components/PageTitle';
import { Standpoints, fetchStandpointData } from '../../src/containers/Standpoints';

const StandPointContainer = ({ name, partyData }) => (
  <React.Fragment>
    <Head>
      <title>{name} | Ämne | Partiguiden.nu</title>
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
  </React.Fragment>
);

StandPointContainer.getInitialProps = async ({ query }) => {
  const url = `${apiLinks.partiguidenApi}/subject/${query.id}`;
  const res = await fetch(url);
  const data = await res.json();
  const partyData = await fetchStandpointData(data.opinions);
  return { name: data.name, partyData: partyData.filter(party => party !== null) };
};

StandPointContainer.propTypes = {
  name: string.isRequired,
  partyData: array.isRequired,
};

export default StandPointContainer;
