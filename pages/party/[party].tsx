import React from 'react';

import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';

import { Container } from '@material-ui/core';

import SocialMediaShare from '../../src/components/SocialMediaShare';
import { PartyData } from '../../src/types/party';
import parties from '../../src/utils/getParties';
import PageTitle from '../../src/components/PageTitle';
import Party from '../../src/containers/Party';
import { getParty } from '../../src/lib/proxy';
import { PARTY_LOGOS } from '../../src/assets/logos';

interface Props {
  party: PartyData;
}

const PartyPage: NextPage<Props> = ({ party }) => {
  const PartyLogo: React.FC = () => (
    <Image
      src={PARTY_LOGOS[party.abbrev.toUpperCase() as PartyData['abbrev']]}
      quality={50}
      width="90%"
      height="90%"
      alt="Party logo"
    />
  );

  return (
    <>
      <Head>
        <title>{party.name} | Parti | Partiguiden</title>
        <meta
          name="description"
          content={`Vilka är ${party.name} och vad är deras ideologi? Läs på om dem här!`}
        />
      </Head>
      <PageTitle variant="h3" title={party.name} Icon={PartyLogo} />
      <Container>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <SocialMediaShare title={party.name} />
        </div>
        <Party party={party} />
      </Container>
    </>
  );
};

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
