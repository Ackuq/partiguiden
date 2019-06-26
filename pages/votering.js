import React from 'react';
import Head from 'next/head';
import Container from '@material-ui/core/Container';
import PropTypes from 'prop-types';

import SocialMediaShare from '../src/components/SocialMediaShare';
import { apiLinks } from '../src/utils';
import PageTitle from '../src/components/PageTitle';
import Votering from '../src/containers/Votering';
import { getVotering } from '../src/containers/Votering/lib';

const VoteringContainer = ({ votering }) => {
  return (
    <React.Fragment>
      <Head>
        <title>{votering.dokument.titel} | Votering | Partiguiden.nu</title>
        <meta
          name="description"
          content={`Hur har partiernat röstat i voteringen om ${votering.dokument.titel}`}
        />
      </Head>
      <PageTitle title={`${votering.dokument.titel} förslagspunkt ${votering.bet}`} variant="h3" />
      <Container>
        <SocialMediaShare title={`${votering.dokument.titel} förslagspunkt ${votering.bet}`} />
        <Votering
          beslut={votering.beslut}
          forslag={votering.forslag}
          bilaga={votering.bilaga}
          behandladeDokument={votering.behandladeDokument}
          voting={votering.voting}
          notisRubrik={votering.notisRubrik.text}
          notisBeskrivning={votering.notisBeskrivning.text}
        />
      </Container>
    </React.Fragment>
  );
};

VoteringContainer.getInitialProps = async ({ query }) => {
  const url = `${apiLinks.riksdagenApi}/dokumentstatus/${query.id}.json`;
  const votering = await getVotering({ bet: query.bet, url });
  return { votering };
};

VoteringContainer.propTypes = {
  votering: PropTypes.object.isRequired
};

export default VoteringContainer;
