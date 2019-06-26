import React from 'react';
import Head from 'next/head';
import Container from '@material-ui/core/Container';
import { string, array } from 'prop-types';
import fetch from 'isomorphic-unfetch';

import { apiLinks } from '../src/utils';
import SocialMediaShare from '../src/components/SocialMediaShare';
import PageTitle from '../src/components/PageTitle';
import Subject from '../src/containers/Subject';
import getData from '../src/containers/Subject/lib/getSubjectData';

const SubjectContainer = ({ name, partyData }) => (
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
      <SocialMediaShare title={name} />
      <Subject partyData={partyData} />
    </Container>
  </React.Fragment>
);

SubjectContainer.getInitialProps = async ({ query }) => {
  const url = `${apiLinks.partiguidenApi}/subject?id=${query.id}`;
  const res = await fetch(url);
  const data = await res.json();
  const partyData = await getData(data.opinions);

  return { name: data.name, partyData: partyData.filter(party => party !== undefined) };
};

SubjectContainer.propTypes = {
  name: string.isRequired,
  partyData: array.isRequired
};

export default SubjectContainer;
