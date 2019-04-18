/* Next.js Head component */
import Head from "next/head";

import { Link } from "../lib/routes";
import axios from "axios";

import RiksdagsbeslutListContainer from "../components/RiksdagsbeslutList/RiksdagsbeslutListContainer";

export default class Riksdagsguiden extends React.Component {
  renderBeslut(beslut) {
    return (
      <tr key={beslut.id}>
        <td>{beslut.notisrubrik}</td>
        <td>
          <Link route="beslut" params={{ id: beslut.id }}>
            <a>Länk till beslut</a>
          </Link>
        </td>
      </tr>
    );
  }

  render() {
    return (
      <React.Fragment>
        <Head>
          <title>Riksdagsbeslut | Partiguiden.nu</title>
          <meta
            name="description"
            content="Vad tar riksdagen för beslut? Här hittar du en sammanfattning på de senaste besluten som tas upp i riksdagen."
          />
        </Head>
        <div className="list-title text-center">
          <h1>Riksdagsguiden</h1>
        </div>
        <div className="container">
          <RiksdagsbeslutListContainer page={1} />
        </div>
      </React.Fragment>
    );
  }
}
