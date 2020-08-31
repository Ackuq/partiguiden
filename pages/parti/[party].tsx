import React from 'react';

import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import Head from 'next/head';

import Container from '@material-ui/core/Container';

import SocialMediaShare from '../../src/components/SocialMediaShare';
import { PartyData } from '../../src/types/party';
import parties from '../../src/utils/getParties';
import PageTitle from '../../src/components/PageTitle';
import Party from '../../src/containers/Party';
import { getParty } from '../../src/lib/proxy';

interface Props {
  party: PartyData;
}

const PartyPage: NextPage<Props> = ({ party }) => (
  <>
    <Head>
      <title>{party.name} | Parti | Partiguiden</title>
    </Head>
    <PageTitle title={party.name} />
    <Container>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <SocialMediaShare title={party.name} />
      </div>
      <Party party={party} />
    </Container>
  </>
);

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const partyAbbrev = Array.isArray(params?.party) ? params?.party[0] || '' : params?.party || '';

  const party = await getParty(partyAbbrev);

  return { props: { party: { ...party, abbrev: partyAbbrev } }, revalidate: 518400 };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const partyAbbrevs = parties.map((party) => party.letter.toLocaleLowerCase());
  const paths = partyAbbrevs.map((party) => ({ params: { party } }));

  return { paths, fallback: false };
};

export default PartyPage;
