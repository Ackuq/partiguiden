import { loadFirebase } from "../lib/db.js";
import Head from "next/head";
import ListObject from "../components/ListObject";
import Grid from "@material-ui/core/Grid";
import NoteIcon from "@material-ui/icons/Note";

export default class Standpunkter extends React.Component {
  static async getInitialProps() {
    let firebase = await loadFirebase();
    let result = await new Promise(resolve => {
      firebase
        .firestore()
        .collection("Pages")
        .onSnapshot({ includeMetadataChanges: true }, function(snapshot) {
          var data = [];
          snapshot.docChanges().forEach(function(change) {
            data.push(
              Object.assign({
                id: change.doc.id,
                name: change.doc.data().name
              })
            );
          });
          resolve(data);
        });
    });
    let sorted = result.sort(function(a, b) {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    });
    let dict = sorted.reduce((a, c) => {
      // c[0] should be the first letter of an entry
      let k = c.name.charAt(0).toLocaleUpperCase();

      // either push to an existing dict entry or create one
      if (a[k]) a[k].push(c);
      else a[k] = [c];

      return a;
    }, {});
    return { data: dict };
  }
  render() {
    const data = this.props.data;
    console;
    return (
      <div className="page-content">
        <Head>
          <title>Partiernas ståndpunkter | Partiguiden.nu 2.0</title>
        </Head>
        <div className="list-title text-center">
          <NoteIcon style={{ fontSize: "2.5rem" }} />
          <h1>Partiernas ståndpunkter</h1>
        </div>
        <Grid container className="container subject-list">
          {Object.keys(data).map(key => (
            <ListObject letter={key} subjects={data[key]} key={`${key}`} />
          ))}
        </Grid>
      </div>
    );
  }
}
