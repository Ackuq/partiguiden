import { withRouter } from "next/router";
import { loadFirebase } from "../lib/db.js";
import Head from "next/head";
import { Link } from "../lib/routes";
import Autosuggest from "react-autosuggest";

import Input from "@material-ui/core/Input";
import ButtonBase from "@material-ui/core/ButtonBase";
import Container from "react-bootstrap/Container";

const getSuggestions = (value, data) => {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;
  return inputLength === 0
    ? []
    : data.filter(
        subject =>
          subject.name.toLowerCase().slice(0, inputLength) === inputValue
      );
};

const getSuggestValue = suggestion => {
  return suggestion.name;
};

const renderSuggestion = suggestion => {
  return (
    <div className="list">
      <ButtonBase className="list-object">
        <Link route="subject" params={{ id: `${suggestion.id}` }}>
          <a className="text-dark">
            <span>{suggestion.name}</span>
          </a>
        </Link>
      </ButtonBase>
    </div>
  );
};

const renderInputComponent = inputProps => {
  const { ref, ...other } = inputProps;

  return <Input {...other} inputRef={ref} />;
};

export default withRouter(
  class SearchEngine extends React.Component {
    constructor(props) {
      super(props);

      this.getInitialValues = this.getInitialValues.bind(this);
      this.onChange = this.onChange.bind(this);
      this.onSuggestionsFetchRequested = this.onSuggestionsFetchRequested.bind(
        this
      );
    }
    static async getInitialProps() {
      let firebase = await loadFirebase();
      let result = await new Promise((resolve, reject) => {
        firebase
          .firestore()
          .collection("Pages")
          .get({ source: "cache" })
          .then(snapshot => {
            let data = [];
            snapshot.forEach(doc => {
              data.push(
                Object.assign({
                  id: doc.id,
                  tags: doc.data().tags,
                  name: doc.data().name
                })
              );
            });
            resolve(data);
          })
          .catch(error => {
            reject([]);
          });
      });
      return { data: result };
    }

    onSuggestionsFetchRequested = ({ value }) => {
      this.setState({
        suggestions: getSuggestions(value, this.props.data)
      });
    };

    onChange = (event, { newValue }) => {
      this.setState({
        value: newValue
      });
    };

    getInitialValues = () => {
      let val = this.props.router.query.query;
      if (val) {
        this.state = {
          value: val,
          suggestions: getSuggestions(val, this.props.data)
        };
      } else {
        this.state = {
          value: "",
          suggestions: []
        };
      }
    };

    render() {
      this.getInitialValues();
      const data = this.props.data;
      const { value, suggestions } = this.state;
      const inputProps = {
        placeholder: "Sök här...",
        value,
        onChange: this.onChange
      };

      return (
        <Container>
          <Head>
            <title>Sök | Partiguiden.nu</title>
          </Head>
          <div id="search-page">
            <Autosuggest
              id="search-page"
              suggestions={suggestions}
              onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
              getSuggestionValue={getSuggestValue}
              renderSuggestion={renderSuggestion}
              renderInputComponent={renderInputComponent}
              inputProps={inputProps}
              alwaysRenderSuggestions={true}
            />
          </div>
        </Container>
      );
    }
  }
);
