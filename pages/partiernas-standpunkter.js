/* Database*/
import firebase from "../lib/db.js";

import Head from "next/head";

/* Custom Component */
import ListObject from "../components/PartiesStandpoints/ListObject";

/* Material UI components*/
import Grid from "@material-ui/core/Grid";
import NoteIcon from "@material-ui/icons/Note";
/* Styles */
import { withStyles } from "@material-ui/core/styles";

const listStyles = theme => ({
  subjectList: {
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "-1rem",
    marginBottom: "1rem",
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

export default withStyles(listStyles)(
  class Standpunkter extends React.Component {
    static async getInitialProps() {
      let result = await new Promise(resolve => {
        firebase
          .firestore()
          .collection("Data")
          .doc("Pages")
          .onSnapshot({ includeMetadataChanges: true }, function(snapshot) {
            var data = [];
            Object.keys(snapshot.data()).forEach(map => {
              data.push(
                Object.assign({
                  id: map,
                  name: snapshot.data()[map].name
                })
              );
            });
            resolve(data);
          });
      });
      return { data: result };
    }
    render() {
      return (
        <React.Fragment>
          <Head>
            <title>Partiernas ståndpunkter | Partiguiden.nu 2.0</title>
            <meta
              name="description"
              content="Vad tar Sveriges partier för ståndpunkter i olika ämnen och sakfrågor? Jämför Sveriges partier politik och hitta det parti du sympatiserar mest med nu!"
            />
          </Head>
          <div className="list-title">
            <NoteIcon style={{ fontSize: "2.5rem" }} />
            <h1>Partiernas ståndpunkter</h1>
          </div>
          <Grid
            container
            classes={{ container: this.props.classes.subjectList }}
          >
            {this.props.data.map(subject => (
              <ListObject subject={subject} key={`${subject.id}`} />
            ))}
          </Grid>
        </React.Fragment>
      );
    }
  }
);
