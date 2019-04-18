/* Next-js imports */
import Head from "next/head";
import { withRouter } from "next/router";

import DokumentComponent from "../components/DokumentComponent";

// ES Modules
import parse from "html-react-parser";
import axios from "axios";

const replace = ({ attribs, children }) => {
  if (attribs && attribs.style) attribs.style = null;
};

export default withRouter(
  class Dokument extends React.Component {
    state = {
      body: null
    };
    componentDidMount() {
      const { id } = this.props.router.query;
      const url = `https://data.riksdagen.se/dokument/${id}`;
      axios({
        method: "get",
        url: url
      }).then(response => {
        const body = parse(response.data, {
          replace: replace
        })[1];
        this.setState({ body: body });
      });
    }
    render() {
      const { body } = this.state;
      const { id } = this.props.router.query;
      return (
        <React.Fragment>
          <Head>
            <title>Dokument {id} | Partiguiden.nu</title>
          </Head>
          {body && <DokumentComponent body={body} />}
        </React.Fragment>
      );
    }
  }
);
