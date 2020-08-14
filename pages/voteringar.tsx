import React from 'react';
import { NextPage, GetServerSideProps } from 'next';
import Head from 'next/head';
import { ParsedUrlQuery } from 'querystring';

import VoteIcon from '@material-ui/icons/HowToVoteRounded';

import PageTitle from '../src/components/PageTitle';
import Votes from '../src/containers/Votes';

const VotesContainer: NextPage = () => (
  <>
    <Head>
      <title>Voteringar | Partiguiden</title>
      <meta
        name="description"
        content="Hur har partierna röstat i voteringar? Ta reda på det här."
      />
    </Head>
    <PageTitle title="Voteringar" Icon={VoteIcon} />
    <Votes />
  </>
);

export default VotesContainer;
