import React, { useState, useEffect } from 'react';
import { withRouter } from 'next/router';
import Head from 'next/head';

import LoadCircle from '../src/components/LoadCircle';
import Votering from '../src/containers/Votering';
import { getVotering } from '../src/containers/Votering/lib';

const VoteringContainer = ({ router }) => {
  const [votering, setVotering] = useState({
    bet: router.query.bet,
    id: router.query.id,
    dokument: {}
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
      <div className="list-title text-center">
        <h2>
          {votering.dokument.titel} förslagspunkt {votering.bet}
        </h2>
      </div>
      <main className="container">
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
      </main>
    </React.Fragment>
  );
};

export default withRouter(VoteringContainer);
