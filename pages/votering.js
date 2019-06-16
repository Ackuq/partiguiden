import React, { useState, useEffect } from 'react';
import { withRouter } from 'next/router';
import Head from 'next/head';
import Container from '@material-ui/core/Container';

import PageTitle from '../src/components/PageTitle';
import LoadCircle from '../src/components/LoadCircle';
import Votering from '../src/containers/Votering';
import { getVotering } from '../src/containers/Votering/lib';

const VoteringContainer = ({ router }) => {
  const [votering, setVotering] = useState({
    bet: router.query.bet,
    id: router.query.id,
    dokument: { titel: '' }
  });
  const [loading, setLoading] = useState(true);

  let mount = true;

  useEffect(() => {
    getVotering({ bet: votering.bet, id: votering.id }).then(result => {
      if (mount) {
        setVotering({ ...votering, ...result });
        setLoading(false);
      }
    });
    return () => {
      mount = false;
    };
  }, []);

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
        {loading ? (
          <LoadCircle />
        ) : (
          <Votering
            beslut={votering.beslut}
            forslag={votering.forslag}
            bilaga={votering.bilaga}
            behandladeDokument={votering.behandladeDokument}
            voting={votering.voting}
            notisRubrik={votering.notisRubrik.text}
            notisBeskrivning={votering.notisBeskrivning.text}
          />
        )}
      </Container>
    </React.Fragment>
  );
};

export default withRouter(VoteringContainer);
