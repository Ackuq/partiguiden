import React from 'react';
import { withRouter } from 'next/router';
import Head from 'next/head';
import axios from 'axios';
import LoadCircle from '../../LoadCircle';

import Votering from './Votering';

import getVotes from './lib';

const getMatches = (forslag, referens) => {
  let newForslag = forslag.replace(/(<br>)|<BR(\/)>/gm, '');

  let matches = newForslag.matchAll(/\b([0-9][0-9][0-9][0-9]\/[0-9][0-9]):(\S+).*/gm);
  matches = [...matches];

  for (let i = 0; i < matches.length; i += 1) {
    newForslag = newForslag.replace(matches[i][0], `[${i}]`);
  }

  for (let i = 0; i < matches.length; i += 1) {
    for (let j = 0; j < referens.length; j += 1) {
      if (matches[i][1] === referens[j].ref_dok_rm && matches[i][2] === referens[j].ref_dok_bet) {
        matches[i][3] = referens[j].ref_dok_id;
      }
    }
  }

  return { matches, newForslag };
};

export default withRouter(
  class VoteringContainer extends React.Component {
    constructor(props) {
      super(props);
      const { id, bet } = props.router.query;

      this.state = {
        bet,
        id,
        beslut: {},
        bilaga: [],
        dokument: [],
        behandladeDokument: [],
        forslag: '',
        loading: true
      };
    }

    componentDidMount() {
      this.getPage();
    }

    getPage() {
      const { bet, id } = this.state;

      axios({
        method: 'get',
        url: `https://data.riksdagen.se/votering/${id}.json`
      }).then(response => {
        const url = response.data.votering.dokument.dokumentstatus_url_xml.replace('http', 'https');
        axios({
          method: 'get',
          url: `${url}.json`
        }).then(res => {
          const { dokumentstatus } = res.data;

          const utskottsforslag = Array.isArray(dokumentstatus.dokutskottsforslag.utskottsforslag)
            ? dokumentstatus.dokutskottsforslag.utskottsforslag[bet - 1]
            : dokumentstatus.dokutskottsforslag.utskottsforslag;

          const { uppgift } = dokumentstatus.dokuppgift;
          const beslut = uppgift.find(el => {
            return el.kod === 'rdbeslut';
          });
          const notisBeskrivning = uppgift.find(el => {
            return el.kod === 'notis';
          });
          const notisRubrik = uppgift.find(el => {
            return el.kod === 'notisrubrik';
          });

          const bilaga = dokumentstatus.dokbilaga ? dokumentstatus.dokbilaga.bilaga[0] : null;

          const { matches, newForslag } = getMatches(
            utskottsforslag.forslag,
            dokumentstatus.dokreferens.referens
          );

          const { table } = utskottsforslag.votering_sammanfattning_html;
          const tableRow = Array.isArray(table) ? table[table.length - 1].tr : table.tr;

          const voting = getVotes(tableRow);

          this.setState({
            forslag: newForslag,
            behandladeDokument: matches,
            dokument: dokumentstatus.dokument,
            bilaga,
            beslut: beslut ? beslut.text : '',
            voting,
            loading: false,
            notisRubrik,
            notisBeskrivning
          });
        });
      });
    }

    render() {
      const {
        dokument,
        beslut,
        forslag,
        behandladeDokument,
        bilaga,
        loading,
        bet,
        voting,
        notisRubrik,
        notisBeskrivning
      } = this.state;
      return (
        <React.Fragment>
          <Head>
            <title>{dokument.titel} | Votering | Partiguiden.nu</title>
            <meta
              name="description"
              content={`Hur har partiernat röstat i voteringen om ${dokument.titel}`}
            />
          </Head>
          <div className="list-title text-center">
            <h2>
              {dokument.titel} forslagspunkt {bet}
            </h2>
          </div>
          {loading ? (
            <LoadCircle />
          ) : (
            <Votering
              beslut={beslut}
              forslag={forslag}
              bilaga={bilaga}
              behandladeDokument={behandladeDokument}
              voting={voting}
              notisRubrik={notisRubrik.text}
              notisBeskrivning={notisBeskrivning.text}
            />
          )}
        </React.Fragment>
      );
    }
  }
);
