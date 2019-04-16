import { withRouter } from "next/router";
import LoadCircle from "../components/LoadCircle";

/* Material UI */
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";

import Head from "next/head";

import axios from "axios";

export default withRouter(
  class Riksdagsguiden extends React.Component {
    state = {
      beslut: {},
      bilaga: [],
      voteringar: [],
      dokument: [],
      forslag: "",
      loading: true
    };
    componentDidMount() {
      let id = this.props.router.query.id;
      let bet = this.props.router.query.bet;

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
          let dokumentStatus = res.data.dokumentstatus;

          let forslag = dokumentStatus.dokutskottsforslag.utskottsforslag;

          if (Array.isArray(forslag)) {
            forslag = forslag[bet - 1];
          }
          let beslut = dokumentStatus.dokuppgift.uppgift.find(el => {
            return el.kod === "rdbeslut";
          });
          let bilaga = dokumentStatus.dokbilaga.bilaga[0];
          console.log(bilaga);

          this.setState({
            forslag: forslag.forslag.replace(/(<br>)|<BR(\/)>/gm, ""),
            dokForslag: forslag,
            dokument: dokumentStatus.dokument,
            bilaga: bilaga,
            beslut: beslut.text,
            loading: false
          });
        });
      });
    }

    render() {
      return (
        <React.Fragment>
          <Head>
            <title>
              {this.state.dokument.titel} | Votering | Partiguiden.nu
            </title>
            <meta
              name="description"
              content={`Hur har partiernat röstat i voteringen om ${
                this.state.dokument.titel
              }`}
            />
          </Head>
          <div className="list-title text-center">
            <h2>
              {this.state.dokument.titel} forslagspunkt{" "}
              {this.props.router.query.bet}
            </h2>
          </div>
          {this.state.loading ? (
            <LoadCircle />
          ) : (
            <div className="container">
              <Card>
                <CardContent>
                  <Typography variant="h5" gutterBottom>
                    Förslagspunkt {this.props.router.query.bet}:{" "}
                    {this.state.dokForslag.rubrik}
                  </Typography>
                  <Typography variant="h6" gutterBottom>
                    Utskottets förslag:
                  </Typography>
                  <Typography
                    variant="body1"
                    paragraph
                    style={{ whiteSpace: "pre-line" }}
                  >
                    {this.state.forslag}
                  </Typography>
                  <Typography variant="h6" gutterBottom>
                    Beslut:
                  </Typography>
                  <Typography variant="body1">{this.state.beslut}</Typography>
                  <Typography variant="h6" gutterBottom>
                    Bilaga:
                  </Typography>
                  <Typography variant="body1">
                    <Link
                      href={this.state.bilaga.fil_url}
                      target="_blank"
                      rel="noopener"
                    >
                      {this.state.bilaga.titel}
                    </Link>
                  </Typography>
                </CardContent>
              </Card>
            </div>
          )}
        </React.Fragment>
      );
    }
  }
);
