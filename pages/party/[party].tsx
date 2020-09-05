import React from 'react';

import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import Head from 'next/head';

import { makeStyles, Theme } from '@material-ui/core';
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

const useStyles = makeStyles((theme: Theme) => ({
  partyLogo: {
    height: 150,
    [theme.breakpoints.down('md')]: {
      height: 125,
    },
    [theme.breakpoints.down('sm')]: {
      height: 100,
    },
  },
}));

const PartyPage: NextPage<Props> = ({ party }) => {
  const classes = useStyles();

  const partyLogo: React.FC = () => (
    <div style={{ marginRight: '1rem' }}>
      <img
        src={`/static/images/party-logos/${party.abbrev.toLocaleUpperCase()}.svg`}
        className={classes.partyLogo}
      />
    </div>
  );

  return (
    <>
      <Head>
        <title>{party.name} | Parti | Partiguiden</title>
      </Head>
      <PageTitle variant="h3" title={party.name} Icon={partyLogo} />
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
