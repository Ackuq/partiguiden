import { withRouter } from "next/router";
import { loadFirebase } from "../lib/db.js";
import Head from "next/head";
import Container from "react-bootstrap/Container";

export async function queryData(tags, firebase, name) {
  let data = [];
  await Promise.all(
    tags.map(async tag => {
      await firebase
        .firestore()
        .collection(name)
        .where("name", "==", tag)
        .get()
        .then(snapshot => {
          if (!snapshot.empty) {
            snapshot.forEach(doc => {
              data.push(doc.data());
            });
          }
        });
    })
  );
  return data;
}

export default withRouter(
  class Subject extends React.Component {
    static async getInitialProps(context) {
      let firebase = await loadFirebase();
      let result = await new Promise((resolve, reject) => {
        firebase
          .firestore()
          .collection("Pages")
          .doc(context.query.title)
          .get()
          .then(doc => {
            let data = doc.data();
            resolve(data);
          })
          .catch(error => {
            reject([]);
          });
      });
      const centerpartiet = await queryData(
        result.tags,
        firebase,
        "Centerpartiet"
      );
      const liberalerna = await queryData(result.tags, firebase, "Liberalerna");
      return { data: result, centerpartiet: centerpartiet };
    }
    render() {
      const data = this.props.data;
      const centerpartiet = this.props.centerpartiet;
      return (
        <Container>
          <Head>
            <title>{data.name} | Partiguiden.nu</title>
          </Head>
          <h1>{data.name}</h1>
          <div>
            {centerpartiet &&
              centerpartiet.map(subject => (
                <ul key={`${subject.name}`}>
                  <li>{subject.name}</li>
                  <li>{subject.address}</li>
                  {subject.opinions.map((opinion, index) => (
                    <li key={`${subject.name}${index}`}>{opinion}</li>
                  ))}
                </ul>
              ))}
          </div>
        </Container>
      );
    }
  }
);
