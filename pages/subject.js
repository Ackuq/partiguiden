import { withRouter } from "next/router";
import { loadFirebase } from "../lib/db.js";
import Head from "next/head";
import Link from "next/link";

import { withStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import PartyComponent from "../components/PartyComponent";

const subjectTheme = theme => ({
  circleContainer: {
    display: "flex",
    justifyContent: "center",
    height: "50vh",
    alignItems: "center",
    flexDirection: "column"
  }
});

export default withStyles(subjectTheme)(
  withRouter(
    class Subject extends React.Component {
      constructor(props) {
        super(props);

        this.state = {
          loading: true,
          partydata: [
            {
              name: "Socialdemokraterna",
              data: []
            },
            {
              name: "Liberalerna",
              data: []
            },
            {
              name: "Centerpartiet",
              data: []
            }
          ]
        };
      }

      getIndex() {
        return ["Socialdemokraterna", "Liberalerna", "Centerpartiet"];
      }

      async fetchFromDatabase(party) {
        let tags = this.props.data.opinions;
        let firebase = await loadFirebase();
        let db = firebase.firestore();

        let da;
        let subject = await new Promise((resolve, reject) => {
          db.collection("Parties")
            .doc(party)
            .onSnapshot({ includeMetadataChanges: true }, function(snapshot) {
              var data = [];
              Object.keys(snapshot.data()).forEach(map => {
                if (tags.indexOf(snapshot.data()[map].name) != -1) {
                  data.push(snapshot.data()[map]);
                }
              });
              resolve(data);
            });
        }).catch(err => {
          // No data found
        });
        let index = this.getIndex().indexOf(party);
        this.state.partydata[index].data = subject;
        return subject;
      }

      async getData() {
        let parties = ["Centerpartiet"];
        var output = [];

        const req = parties.map(async party => {
          await this.fetchFromDatabase(party);
        });

        Promise.all(req).then(() => {
          this.setState({
            loading: false
          });
        });
      }

      componentDidMount() {
        this.getData();
      }
      static async getInitialProps({ ...props }) {
        const id = props.query.id;
        var result = [];
        var output = [];
        let firebase = await loadFirebase();
        let db = firebase.firestore();

        result = await new Promise((resolve, reject) => {
          db.collection("Data")
            .doc("Pages")
            .onSnapshot({ includeMetadataChanges: true }, function(snapshot) {
              console.log(snapshot.metadata);
              resolve(snapshot.data()[id]);
            });
        });
        return { data: result };
      }
      renderPartyComponent(party) {
        if (party.data.length > 0) {
          return <PartyComponent key={party.name} party={party} />;
        }
      }

      render() {
        const data = this.props.data;
        let partydata = this.state.partydata;
        return (
          <div>
            <Head>
              <title>{data.name} | Partiguiden.nu</title>
            </Head>
            <div className="list-title text-center">
              <h1>{data.name}</h1>
            </div>

            <div className="container" style={{ marginTop: "1rem" }}>
              {this.state.loading ? (
                <div className={this.props.classes.circleContainer}>
                  <CircularProgress size={100} />
                </div>
              ) : (
                <React.Fragment>
                  {partydata.map(party => this.renderPartyComponent(party))}
                </React.Fragment>
              )}
            </div>
          </div>
        );
      }
    }
  )
);
