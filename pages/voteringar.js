/* Next.js Head component */
import Head from "next/head";

import VoteringListContainer from "../components/Voteringar/VoteringListContainer";

import axios from "axios";

export default class Voteringar extends React.Component {
  render() {
    return (
      <div>
        <Head>
          <title>Voteringar | Partiguiden.nu</title>
        </Head>
        <div className="list-title text-center">
          <h1>Voteringar</h1>
        </div>
        <div className="container">
          <VoteringListContainer page={1} />
        </div>
      </div>
    );
  }
}
