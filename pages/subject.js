import { withRouter } from "next/router";
import { loadFirebase } from "../lib/db.js";
import Head from "next/head";
import Link from "next/link";

import Container from "react-bootstrap/Container";

export default withRouter(
  class Subject extends React.Component {
    static async getInitialProps({ ...props }) {
      const id = props.query.id;
      let firebase = await loadFirebase();
      let db = firebase.firestore();
      let result = await new Promise((resolve, reject) => {
        db.collection("Pages")
          .doc(id)
          .get()
          .then(doc => {
            let data = doc.data();
            resolve(data);
          })
          .catch(error => {
            reject([]);
          });
      });

      let parties = ["Centerpartiet", "Liberalerna"];
      let output = [];
      await Promise.all(
        parties.map(async party => {
          let data = [];
          await Promise.all(
            result.tags.map(async tag => {
              await db
                .collection(party)
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
          output.push({ name: party, subjects: data });
        })
      );
      return { data: result, partydata: output };
    }

    async queryData(tags) {
      let firebase = await loadFirebase();
    }

    render() {
      const data = this.props.data;
      const partydata = this.props.partydata;
      return (
        <Container>
          <Head>
            <title>{data.name} | Partiguiden.nu</title>
          </Head>
          <h1>{data.name}</h1>
          <div>
            {partydata &&
              partydata.map(party => (
                <div
                  key={`${party.name}`}
                  id={`${party.name}`}
                  className="mb-3 mt-1"
                >
                  <div className="partititle text-center py-2">
                    <h3 className="my-2 font-weight-light">{party.name}</h3>
                  </div>
                  <div className="slidetoggle">
                    {party.subjects.map(subject => (
                      <div
                        key={`${party.name}${subject.name}`}
                        className="opinion_box"
                      >
                        <h4 className="font-weight-light mt-2">
                          {subject.name}
                        </h4>
                        <ul className="font-weight-light pl-2 mt-2">
                          {subject.opinions.map((opinion, index) => (
                            <li key={`${party.name}${subject.name}${index}`}>
                              {opinion}
                            </li>
                          ))}
                        </ul>
                        <Link href={`${subject.address}`}>
                          <a target="_blank" className="d-flex p-1 m-1">
                            Läs mer på partiets hemsida
                          </a>
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
          </div>
        </Container>
      );
    }
  }
);
