import React from 'react';
import Head from 'next/head';
import Container from '@material-ui/core/Container';
import PropTypes from 'prop-types';

import SocialMediaShare from '../src/components/SocialMediaShare';
import { apiLinks } from '../src/utils';
import PageTitle from '../src/components/PageTitle';
import Votering from '../src/containers/Votering';
import { getVotering } from '../src/containers/Votering/lib';

const VoteringContainer = ({ votering, bet }) => (
  <React.Fragment>
    <Head>
      <title>{votering.dokument.titel} | Votering | Partiguiden.nu</title>
      <meta
        name="description"
        content={`Hur har partiernat röstat i voteringen om ${votering.dokument.titel}`}
      />
    </Head>
    <PageTitle title={`${votering.dokument.titel} förslagspunkt ${bet}`} variant="h3" />
    <Container>
      <SocialMediaShare title={`${votering.dokument.titel} förslagspunkt ${bet}`} />
      <Votering {...votering} />
    </Container>
  </React.Fragment>
);

VoteringContainer.getInitialProps = async ({ query }) => {
  const url = `${apiLinks.riksdagenApi}/dokumentstatus/${query.id}.json`;
  const votering = await getVotering({ bet: query.bet, url });
  return { votering, bet: query.bet };
};

VoteringContainer.propTypes = {
  votering: PropTypes.object.isRequired,
  bet: PropTypes.string.isRequired
};

export default VoteringContainer;
