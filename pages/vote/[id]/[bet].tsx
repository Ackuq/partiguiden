import React from 'react';
import { NextPage, GetServerSideProps } from 'next';
import Head from 'next/head';
import Container from '@material-ui/core/Container';

import Breadcrumbs from '../../../src/components/Breadcrumbs';
import SocialMediaShare from '../../../src/components/SocialMediaShare';
import PageTitle from '../../../src/components/PageTitle';
import Vote from '../../../src/containers/Vote';

import * as ROUTES from '../../../src/lib/routes';
import { useVote } from '../../../src/hooks/parliamentHooks';
import LoadCircle from '../../../src/components/LoadCircle';

interface Props {
  proposition: number;
  id: string;
}

const VoteContainer: NextPage<Props> = ({ proposition, id }) => {
  const vote = useVote(id, proposition);

  return (
    <>
      <Head>
        <title>
          {id} {proposition} | Votering | Partiguiden
        </title>
        <meta name="description" content={`Hur har partiernat röstat i voteringen ${id}`} />
      </Head>

      <PageTitle title={vote ? `${vote.title} förslagspunkt ${proposition}` : ''} variant="h4" />
      <Container>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Breadcrumbs
            links={[
              { href: ROUTES.VOTES, label: 'Voteringar' },
              { href: ROUTES.VOTE, as: ROUTES.getVoteHref(id, proposition), label: 'Votering' },
            ]}
          />
          <SocialMediaShare title={`${id} förslagspunkt ${proposition}`} />
        </div>
        {vote ? <Vote vote={vote} /> : <LoadCircle />}
      </Container>
    </>
  );
};

const getBet = (bet: string | Array<string>) => {
  if (Array.isArray(bet)) {
    return parseInt(bet[0], 10);
  }
  return parseInt(bet, 10);
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const id = Array.isArray(query.id) ? query.id[0] : query.id || '';
  const proposition = query.bet ? getBet(query.bet) : 0;

  return { props: { proposition, id } };
};

export default VoteContainer;
