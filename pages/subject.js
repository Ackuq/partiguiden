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
          .onSnapshot({ includeMetadataChanges: true }, function(doc) {
            resolve(doc.data());
          });
      }).catch(error => {
        reject([]);
      });

      let parties = ["Centerpartiet", "Liberalerna"];
      let output = [];
      await Promise.all(
        parties.map(async party => {
          let subjectData = [];
          await Promise.all(
            result.tags.map(async tag => {
              let partySubject = await new Promise(resolve => {
                db.collection(party)
                  .where("name", "==", tag)
                  .onSnapshot({ includeMetadataChanges: true }, function(
                    snapshot
                  ) {
                    var data;
                    snapshot.docChanges().forEach(function(change) {
                      data = change.doc.data();
                    });
                    resolve(data);
                  });
              });
              if (partySubject) subjectData.push(partySubject);
            })
          );
          if (subjectData.length > 0)
            output.push({ name: party, subjects: subjectData });
        })
      );
      return { data: result, partydata: output };
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
