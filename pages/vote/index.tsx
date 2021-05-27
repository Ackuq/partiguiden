import React from 'react';
import { NextPage } from 'next';
import Head from 'next/head';

import { HowToVoteRounded as VoteIcon } from '@material-ui/icons';

import PageTitle from '../../src/components/PageTitle';
import Votes from '../../src/containers/Votes';

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
