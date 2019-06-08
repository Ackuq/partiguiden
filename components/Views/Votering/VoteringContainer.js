import React, { useState, useEffect } from 'react';
import fetch from 'isomorphic-unfetch';
import { withRouter } from 'next/router';
import Head from 'next/head';
import { parseString } from 'xml2js';

import LoadCircle from '../../LoadCircle';
import Votering from './Votering';

import { getVotes } from '../Voteringar/lib';

const getMatches = (forslag, referens) => {
  let newForslag = forslag.replace(/(<br>)|<BR(\/)>/gm, '');

  let matches = newForslag.matchAll(/\b([0-9][0-9][0-9][0-9]\/[0-9][0-9]):(\S+).*/gm);
  matches = [...matches];

  for (let i = 0; i < matches.length; i += 1) {
    newForslag = newForslag.replace(matches[i][0], `[${i}]`);
  }

  for (let i = 0; i < matches.length; i += 1) {
    for (let j = 0; j < referens.length; j += 1) {
      if (
        matches[i][1] === referens[j].ref_dok_rm[0] &&
        matches[i][2] === referens[j].ref_dok_bet[0]
      ) {
        // eslint-disable-next-line prefer-destructuring
        matches[i][3] = referens[j].ref_dok_id[0];
      }
    }
  }

  return { matches, newForslag };
};

const VoteringContainer = ({ router }) => {
  const [votering, setVotering] = useState({
    bet: router.query.bet,
    id: router.query.id,
    dokument: {}
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://data.riksdagen.se/votering/${votering.id}.json`)
      .then(res => res.json())
      .then(data => {
        const url = data.votering.dokument.dokumentstatus_url_xml.replace('http', 'https');
        fetch(url)
          .then(res => res.text())
          .then(xml =>
            parseString(xml, (err, result) => {
              const { dokumentstatus } = result;
              const { utskottsforslag } = dokumentstatus.dokutskottsforslag[0];
              const currUtskottsforslag = Array.isArray(utskottsforslag)
                ? utskottsforslag[votering.bet - 1]
                : utskottsforslag;

              const { matches, newForslag } = getMatches(
                currUtskottsforslag.forslag[0],
                dokumentstatus.dokreferens[0].referens
              );

              const { uppgift } = dokumentstatus.dokuppgift[0];

              const beslut = uppgift.find(el => {
                return el.kod[0] === 'rdbeslut';
              });

              const notisBeskrivning = uppgift.find(el => {
                return el.kod[0] === 'notis';
              });

              const notisRubrik = uppgift.find(el => {
                return el.kod[0] === 'notisrubrik';
              });

              const { table } = currUtskottsforslag.votering_sammanfattning_html[0];
              const tableRow = Array.isArray(table) ? table[table.length - 1].tr : table.tr;
              setVotering({
                ...votering,
                forslag: newForslag,
                behandladeDokument: matches,
                dokument: dokumentstatus.dokument[0],
                bilaga: dokumentstatus.dokbilaga[0] ? dokumentstatus.dokbilaga[0].bilaga[0] : null,
                beslut: beslut ? beslut.text[0] : '',
                voting: getVotes(tableRow),
                notisRubrik,
                notisBeskrivning
              });

              setLoading(false);
            })
          );
      });
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
      {loading ? (
        <LoadCircle />
      ) : (
        <Votering
          beslut={votering.beslut}
          forslag={votering.forslag}
          bilaga={votering.bilaga}
          behandladeDokument={votering.behandladeDokument}
          voting={votering.voting}
          notisRubrik={votering.notisRubrik.text[0]}
          notisBeskrivning={votering.notisBeskrivning.text[0]}
        />
      )}
    </React.Fragment>
  );
};

export default withRouter(VoteringContainer);
