import React from 'react';
import Head from 'next/head';
import { Container } from '@material-ui/core';
import PropTypes from 'prop-types';

import Breadcrumbs from '../../../src/components/Breadcrumbs';
import SocialMediaShare from '../../../src/components/SocialMediaShare';
import { apiLinks } from '../../../src/utils';
import PageTitle from '../../../src/components/PageTitle';
import { Vote, fetchVote } from '../../../src/containers/Vote';

const VoteContainer = ({ vote, bet }) => (
  <>
    <Head>
      <title>{vote.document.titel} | Votering | Partiguiden.nu</title>
      <meta
        name="description"
        content={`Hur har partiernat röstat i voteringen om ${vote.document.titel}`}
      />
    </Head>
    <PageTitle title={`${vote.document.titel} förslagspunkt ${bet}`} variant="h3" />
    <Container>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Breadcrumbs
          links={[
            { href: '/voteringar', label: 'Voteringar' },
            { href: '#', label: 'Votering' },
          ]}
        />
        <SocialMediaShare title={`${vote.document.titel} förslagspunkt ${bet}`} />
      </div>
      <Vote {...vote} />
    </Container>
  </>
);

VoteContainer.getInitialProps = async ({ query }) => {
  const url = `${apiLinks.riksdagenApi}/dokumentstatus/${query.id}.json`;
  const vote = await fetchVote({ bet: query.bet, url });
  return { vote, bet: query.bet };
};

VoteContainer.propTypes = {
  vote: PropTypes.object.isRequired,
  bet: PropTypes.string.isRequired,
};

export default VoteContainer;
