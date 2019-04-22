/* Next.js Head component */
import Head from "next/head";
import { withRouter } from "next/router";

import VoteringList from "../components/VoteringList";

import axios from "axios";

export default withRouter(
  class Voteringar extends React.Component {
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
            <title>Voteringar | Partiguiden.nu</title>
            <meta
              name="description"
              content="Hur har partierna röstat i voteringar? Ta reda på det här."
            />
          </Head>
          <div className="list-title text-center">
            <h1>Voteringar</h1>
          </div>
          <VoteringList
            query={query}
            asPath={asPath}
            {...this.props}
            page={1}
          />
        </React.Fragment>
      );
    }
  }
);
