import { withRouter } from "next/router";
import { loadFirebase } from "../lib/db.js";
import Head from "next/head";
import Link from "next/link";

import PartyComponent from "../components/PartyComponent";
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
          if (data.length > 0) output.push({ name: party, subjects: data });
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
          {partydata &&
            partydata.map(party => (
              <PartyComponent key={party.name} party={party} />
            ))}
        </Container>
      );
    }
  }
);
