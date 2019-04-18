import { withRouter } from "next/router";
import LoadCircle from "../components/LoadCircle";

import VoteringComponent from "../components/VoteringComponent";

import Head from "next/head";

import axios from "axios";

const getMatches = (forslag, referens) => {
  forslag = forslag.replace(/(<br>)|<BR(\/)>/gm, "");

  let matches = forslag.matchAll(
    /\b([0-9][0-9][0-9][0-9]\/[0-9][0-9]):(\S+).*/gm
  );
  matches = [...matches];

  for (let i = 0; i < matches.length; i++) {
    forslag = forslag.replace(matches[i][0], "[" + i + "]");
  }

  for (let i = 0; i < matches.length; i++) {
    for (let j = 0; j < referens.length; j++) {
      if (
        matches[i][1] === referens[j].ref_dok_rm &&
        matches[i][2] === referens[j].ref_dok_bet
      ) {
        matches[i][3] = referens[j].ref_dok_id;
      }
    }
  }

  return { matches, forslag };
};

const getVotes = row => {
  let voting = {};
  for (let i = 2; i < row.length - 1; i++) {
    const { td } = row[i];
    const partyVotes = {
      ja: td[1],
      nej: td[2],
      avstaende: td[3],
      franvarande: td[4]
    };
    voting[td[0]] = partyVotes;
  }
  return voting;
};

export default withRouter(
  class Votering extends React.Component {
    constructor(props) {
      super(props);
      const { id, bet } = props.router.query;

      this.state = {
        bet: bet,
        id: id,
        beslut: {},
        bilaga: [],
        voteringar: [],
        dokument: [],
        behandladeDokument: [],
        forslag: "",
        loading: true
      };
    }
    componentDidMount() {
      const { bet, id } = this.state;

      axios({
        method: "get",
        url: `https://data.riksdagen.se/votering/${id}.json`
      }).then(response => {
        let url = response.data.votering.dokument.dokumentstatus_url_xml.replace(
          "http",
          "https"
        );
        axios({
          method: "get",
          url: url + ".json"
        }).then(res => {
          const { dokumentstatus } = res.data;

          const utskottsforslag = Array.isArray(
            dokumentstatus.dokutskottsforslag.utskottsforslag
          )
            ? dokumentstatus.dokutskottsforslag.utskottsforslag[bet - 1]
            : dokumentstatus.dokutskottsforslag.utskottsforslag;

          const beslut = dokumentstatus.dokuppgift.uppgift.find(el => {
            return el.kod === "rdbeslut";
          });

          const bilaga = dokumentstatus.dokbilaga
            ? dokumentstatus.dokbilaga.bilaga[0]
            : null;

          const { matches, forslag } = getMatches(
            utskottsforslag.forslag,
            dokumentstatus.dokreferens.referens
          );
          const voting = getVotes(
            utskottsforslag.votering_sammanfattning_html.table.tr
          );
          this.setState({
            forslag: forslag,
            behandladeDokument: matches,
            dokument: dokumentstatus.dokument,
            bilaga: bilaga,
            beslut: beslut.text,
            voting: voting,
            loading: false
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
        voting
      } = this.state;

      return (
        <React.Fragment>
          <Head>
            <title>{dokument.titel} | Votering | Partiguiden.nu</title>
            <meta
              name="description"
              content={`Hur har partiernat röstat i voteringen om ${
                dokument.titel
              }`}
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
            <VoteringComponent
              beslut={beslut}
              forslag={forslag}
              bilaga={bilaga}
              behandladeDokument={behandladeDokument}
              voting={voting}
              beslut={beslut}
            />
          )}
        </React.Fragment>
      );
    }
  }
);
