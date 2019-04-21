/* Next.js Head component */
import Head from "next/head";
import { withRouter } from "next/router";

import { Link } from "../lib/routes";
import axios from "axios";

import RiksdagsbeslutListContainer from "../components/RiksdagsbeslutList";

export default withRouter(
  class Riksdagsguiden extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        query: props.router.query,
        asPath: props.router.asPath
      };
    }

    static getDerivedStateFromProps(nextProps, prevState) {
      if (nextProps.router.asPath !== prevState.asPath) {
        return {
          asPath: nextProps.router.asPath,
          query: nextProps.router.query
        };
      } else return null;
    }

    render() {
      const { query, asPath } = this.state;

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
            <h1>Riksdagsbeslut</h1>
          </div>
          <div className="container">
            <RiksdagsbeslutListContainer
              query={query}
              asPath={asPath}
              page={1}
            />
          </div>
        </React.Fragment>
      );
    }
  }
);
