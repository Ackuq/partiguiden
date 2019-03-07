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
        this.getData = this.getData.bind(this);
        this.getPartyOpinions = this.getPartyOpinions.bind(this);
        this.fetchFromDatabase = this.fetchFromDatabase.bind(this);
        this.getIndex = this.getIndex.bind(this);

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
        this.getData();
      }

      getIndex() {
        return ["Socialdemokraterna", "Liberalerna", "Centerpartiet"];
      }

      async fetchFromDatabase(tag, party) {
        let firebase = await loadFirebase();
        let db = firebase.firestore();

        let subject = await new Promise((resolve, reject) => {
          db.collection(party)
            .where("name", "==", tag)
            .onSnapshot({ includeMetadataChanges: true }, function(snapshot) {
              if (snapshot.docChanges().length > 0) {
                snapshot.docChanges().forEach(function(change) {
                  resolve(change.doc.data());
                });
              } else {
                reject();
              }
            });
        }).catch(err => {
          // No data found
        });
        return subject;
      }

      async getPartyOpinions(party) {
        let result = this.props.data;

        let res = new Array();
        let index = this.getIndex().indexOf(party);
        await new Promise(resolve => {
          const req = result.tags.map(async tag => {
            return this.fetchFromDatabase(tag, party).then(data => {
              if (data) res.push(data);
            });
          });
          Promise.all(req).then(() => {
            this.state.partydata[index].data = res;
            resolve(res);
          });
        });
      }

      async getData() {
        let parties = ["Centerpartiet", "Liberalerna", "Socialdemokraterna"];
        var output = [];

        const req = parties.map(async party => {
          await this.getPartyOpinions(party);
        });

        Promise.all(req).then(() => {
          this.setState({
            loading: false
          });
        });
      }

      static async getInitialProps({ ...props }) {
        const id = props.query.id;
        var result = [];
        var output = [];
        let firebase = await loadFirebase();
        let db = firebase.firestore();

        result = await new Promise((resolve, reject) => {
          db.collection("Pages")
            .doc(id)
            .onSnapshot({ includeMetadataChanges: true }, function(doc) {
              resolve(doc.data());
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
