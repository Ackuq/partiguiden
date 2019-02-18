import Container from "react-bootstrap/Container";
import { loadFirebase } from "../lib/db.js";
import Link from "next/link";
import Head from "next/head";

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
    return { data: result };
  }
  render() {
    const data = this.props.data;
    return (
      <Container>
        <Head>
          <title>Partiernas ståndpunkter | Partiguiden.nu 2.0</title>
        </Head>
        <div>
          <ul>
            {data.map(subject => (
              <li key={`${subject.id}`}>
                <Link
                  as={`/subject/${subject.id}`}
                  href={`/subject?title=${subject.id}`}
                >
                  <a>{subject.name}</a>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    );
  }
}
