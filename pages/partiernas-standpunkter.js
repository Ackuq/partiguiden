import Container from "react-bootstrap/Container";
import { loadFirebase } from "../lib/db.js";
import Head from "next/head";
import ListObject from "../components/ListObject";

export default class Standpunkter extends React.Component {
  static async getInitialProps() {
    let firebase = await loadFirebase();
    let result = await new Promise((resolve, reject) => {
      firebase
        .firestore()
        .collection("Pages")
        .get()
        .then(snapshot => {
          let data = [];
          snapshot.forEach(doc => {
            data.push(
              Object.assign({
                id: doc.id,
                name: doc.data().name
              })
            );
          });
          resolve(data);
        })
        .catch(error => {
          reject([]);
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
      <Container>
        <Head>
          <title>Partiernas ståndpunkter | Partiguiden.nu 2.0</title>
        </Head>
        <div className="font-weight-light">
          <h1>Partiernas ståndpunkter</h1>
        </div>
        <div className="subject-list">
          {Object.keys(data).map(key => (
            <ListObject letter={key} subjects={data[key]} key={`${key}`} />
          ))}
        </div>
      </Container>
    );
  }
}
