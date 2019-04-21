/* Next-js imports */
import Head from "next/head";
import { withRouter } from "next/router";

import LoadCircle from "../components/LoadCircle";

// ES Modules
import parse from "html-react-parser";
import axios from "axios";

export default withRouter(
  class Dokument extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        body: null,
        id: props.router.query.id
      };
    }

    componentDidMount() {
      this.getDoc();
    }

    getDoc() {
      const { id } = this.state;
      const url = `https://data.riksdagen.se/dokument/${id}`;

      axios({
        method: "get",
        url: url
      }).then(response => {
        const html = parse(response.data);
        let body;
        for (let i = 0; i < html.length; i++) {
          if (html[i].type && html[i].type === "div") {
            body = html[i];
            break;
          }
        }
        this.setState({ body: body });
      });
    }

    render() {
      const { body, id } = this.state;
      return (
        <React.Fragment>
          <Head>
            <title>Dokument {id} | Partiguiden.nu</title>
          </Head>
          {body ? (
            <div
              className="container dokumentBody"
              style={{ paddingTop: "1.5rem" }}
            >
              {body}
            </div>
          ) : (
            <LoadCircle />
          )}
        </React.Fragment>
      );
    }
  }
);
