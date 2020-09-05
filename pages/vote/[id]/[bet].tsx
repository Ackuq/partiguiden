import React from 'react';
import { NextPage, GetServerSideProps } from 'next';
import Head from 'next/head';
import Container from '@material-ui/core/Container';

import Breadcrumbs from '../../../src/components/Breadcrumbs';
import SocialMediaShare from '../../../src/components/SocialMediaShare';
import PageTitle from '../../../src/components/PageTitle';
import Vote from '../../../src/containers/Vote';
import { Vote as VoteType } from '../../../src/types/voting';
import { getVote } from '../../../src/lib/proxy';

import * as ROUTES from '../../../src/lib/routes';

interface Props {
  vote: VoteType;
  proposition: number;
  id: string;
}

const VoteContainer: NextPage<Props> = ({ vote, proposition, id }) => (
  <>
    <Head>
      <title>{vote.title} | Votering | Partiguiden</title>
      <meta
        name="description"
        content={`Hur har partiernat röstat i voteringen om ${vote.title}`}
      />
    </Head>
    <PageTitle title={`${vote.title} förslagspunkt ${proposition}`} variant="h4" />
    <Container>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Breadcrumbs
          links={[
            { href: ROUTES.VOTES, label: 'Voteringar' },
            { href: ROUTES.VOTE, as: ROUTES.getVoteHref(id, proposition), label: 'Votering' },
          ]}
        />
        <SocialMediaShare title={`${vote.title} förslagspunkt ${proposition}`} />
      </div>
      <Vote vote={vote} />
    </Container>
  </>
);

const getBet = (bet: string | Array<string>) => {
  if (Array.isArray(bet)) {
    return parseInt(bet[0], 10);
  }
  return parseInt(bet, 10);
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const id = Array.isArray(query.id) ? query.id[0] : query.id || '';
  const proposition = query.bet ? getBet(query.bet) : 0;

  const vote = await getVote(id, proposition);

  return { props: { vote, proposition, id } };
};

export default VoteContainer;
