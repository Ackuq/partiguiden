import { withRouter } from "next/router";
import LoadCircle from "../components/LoadCircle";

/* Material UI */
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

import Head from "next/head";

import axios from "axios";

export default withRouter(
  class Riksdagsguiden extends React.Component {
    state = {
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
        axios({
          method: "get",
          url: response.data.votering.dokument.dokumentstatus_url_xml + ".json"
        }).then(res => {
          let dokumentStatus = res.data.dokumentstatus;

          let forslag = dokumentStatus.dokutskottsforslag.utskottsforslag;

          if (Array.isArray(forslag)) {
            forslag = forslag[bet - 1];
          }
          let beslut = dokumentStatus.dokuppgift.uppgift.find(el => {
            return el.kod === "rdbeslut";
          });
          this.setState({
            forslag: forslag.forslag.replace(/(<br>)|<BR(\/)>/gm, ". "),
            dokForslag: forslag,
            dokument: dokumentStatus.dokument,
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
                  <Typography variant="body1" paragraph>
                    {this.state.forslag}
                  </Typography>
                  <Typography variant="h6" gutterBottom>
                    Beslut:
                  </Typography>
                  <Typography variant="body1">{this.state.beslut}</Typography>
                </CardContent>
              </Card>
            </div>
          )}
        </React.Fragment>
      );
    }
  }
);
