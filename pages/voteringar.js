import React from 'react';
import Head from 'next/head';
import VoteIcon from '@material-ui/icons/HowToVoteRounded';
import { object } from 'prop-types';

import PageTitle from '../src/components/PageTitle';
import Votes from '../src/containers/Votes';

const VotesContainer = ({ query }) => (
  <>
    <Head>
      <title>Voteringar | Partiguiden.nu</title>
      <meta
        name="description"
        content="Hur har partierna röstat i voteringar? Ta reda på det här."
      />
    </Head>
    <PageTitle title="Voteringar" Icon={VoteIcon} />
    <Votes query={query} />
  </>
);

VotesContainer.getInitialProps = async ({ query }) => ({ query });
VotesContainer.propTypes = {
  query: object.isRequired,
};

export default VotesContainer;
