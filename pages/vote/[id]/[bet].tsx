import React from 'react';
import { NextPage, GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Head from 'next/head';
import { Container } from '@material-ui/core';

import Breadcrumbs from '../../../src/components/Breadcrumbs';
import SocialMediaShare from '../../../src/components/SocialMediaShare';
import PageTitle from '../../../src/components/PageTitle';
import Vote from '../../../src/containers/Vote';

import * as ROUTES from '../../../src/lib/routes';
import { useVote } from '../../../src/hooks/parliamentHooks';
import LoadCircle from '../../../src/components/LoadCircle';

const VoteContainer: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = ({
  proposition,
  id,
}) => {
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

export const getServerSideProps: GetServerSideProps<
  { proposition: number; id: string },
  { id: string; bet: string }
> = async ({ params }) => {
  const id = params?.id;
  const bet = params?.bet;
  if (id === undefined || bet === undefined) {
    return { notFound: true };
  }
  const proposition = parseInt(bet, 10);

  return { props: { proposition, id } };
};

export default VoteContainer;
