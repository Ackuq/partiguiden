/* Database*/
import firebase from "../lib/db.js";

import Head from "next/head";

/* Custom Component */
import ListObject from "../components/ListObject";

/* Material UI components*/
import Grid from "@material-ui/core/Grid";
import NoteIcon from "@material-ui/icons/Note";

export default class Standpunkter extends React.Component {
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
      <div className="page-content">
        <Head>
          <title>Partiernas ståndpunkter | Partiguiden.nu 2.0</title>
        </Head>
        <div className="list-title text-center">
          <NoteIcon style={{ fontSize: "2.5rem" }} />
          <h1>Partiernas ståndpunkter</h1>
        </div>
        <Grid
          container
          className="container subject-list"
          style={{ marginTop: "-1rem", marginBottom: "1rem", padding: "0" }}
        >
          {this.props.data.map(subject => (
            <ListObject subject={subject} key={`${subject.id}`} />
          ))}
        </Grid>
      </div>
    );
  }
}
