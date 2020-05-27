import React from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import Container from '@material-ui/core/Container';

import Breadcrumbs from '../../../src/components/Breadcrumbs';
import SocialMediaShare from '../../../src/components/SocialMediaShare';
import PageTitle from '../../../src/components/PageTitle';
import Vote from '../../../src/containers/Vote';
import parseVote from '../../../src/containers/Vote/parseVote';
import { getVote } from '../../../src/lib/parlimentApi';

interface Props {
  vote: any;
  bet: number;
}

const VoteContainer: NextPage<Props> = ({ vote, bet }) => (
  <>
    <Head>
      <title>{vote.document.titel} | Votering | Partiguiden</title>
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
  const id = Array.isArray(query.id) ? query.id[0] : query.id || '';
  const bet = query.bet ? getBet(query.bet) : 0;

  const res = await getVote(id);

  return { vote: parseVote(res, bet), bet };
};

export default VoteContainer;
