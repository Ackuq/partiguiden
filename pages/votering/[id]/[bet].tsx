import React from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import Container from '@material-ui/core/Container';

import Breadcrumbs from '../../../src/components/Breadcrumbs';
import SocialMediaShare from '../../../src/components/SocialMediaShare';
import { apiLinks } from '../../../src/utils';
import PageTitle from '../../../src/components/PageTitle';
import { Vote, fetchVote } from '../../../src/containers/Vote';

interface Props {
  vote: any;
  bet: number;
}

const VoteContainer: NextPage<Props> = ({ vote, bet }) => (
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

const getBet = (bet: string | Array<string>) => {
  if (Array.isArray(bet)) {
    return parseInt(bet[0], 10);
  }
  return parseInt(bet, 10);
};

VoteContainer.getInitialProps = async ({ query }) => {
  const url = `${apiLinks.riksdagenApi}/dokumentstatus/${query.id}.json`;
  const bet = query.bet ? getBet(query.bet) : 0;
  const vote = await fetchVote({ bet, url });
  return { vote, bet };
};

export default VoteContainer;
