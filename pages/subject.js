/* Database */
import firebase from "../lib/db.js";

/* Next js components */
import { withRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";

/* Custom components */
import PartyComponent from "../components/PartyComponent";

/* Material ui components */
import { withStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

const subjectTheme = theme => ({
  circleContainer: {
    display: "flex",
    justifyContent: "center",
    height: "50vh",
    alignItems: "center",
    flexDirection: "column"
  },
  contain: {
    padding: "0 0.25rem",
    marginLeft: "auto",
    marginRight: "auto",
    [theme.breakpoints.up("md")]: {
      maxWidth: "90%"
    },
    [theme.breakpoints.up("lg")]: {
      maxWidth: "70%"
    },
    [theme.breakpoints.up("xl")]: {
      maxWidth: "60%"
    }
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
              name: "Sverigedemokraterna",
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
        return ["Socialdemokraterna", "Sverigedemokraterna", "Centerpartiet"];
      }

      async fetchFromDatabase(party, index) {
        let tags = this.props.data.opinions;
        let subject = await new Promise((resolve, reject) => {
          firebase
            .firestore()
            .collection("Parties")
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
        this.state.partydata[index].data = subject;
        return subject;
      }

      async getData() {
        let parties = this.getIndex();
        var output = [];

        const req = parties.map(async (party, index) => {
          await this.fetchFromDatabase(party, index);
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
        result = await new Promise((resolve, reject) => {
          firebase
            .firestore()
            .collection("Data")
            .doc("Pages")
            .onSnapshot({ includeMetadataChanges: true }, function(snapshot) {
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
          <React.Fragment>
            <Head>
              <title>{data.name} | Partiguiden.nu</title>
            </Head>
            <div className="list-title text-center">
              <h1>{data.name}</h1>
            </div>

            {this.state.loading ? (
              <div className={this.props.classes.circleContainer}>
                <CircularProgress size={100} />
              </div>
            ) : (
              <div className={this.props.classes.contain}>
                {partydata.map(party => this.renderPartyComponent(party))}
              </div>
            )}
          </React.Fragment>
        );
      }
    }
  )
);
