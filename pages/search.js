import { withRouter } from "next/router";
import { loadFirebase } from "../lib/db.js";
import Head from "next/head";
import { Link } from "../lib/routes";
import Autosuggest from "react-autosuggest";

import AutosuggestTheme from "../styles/AutosuggestTheme.css";
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
    <div>
      <Link route="subject" params={{ id: `${suggestion.id}` }}>
        <a className="custom-nav-link">{suggestion.name}</a>
      </Link>
    </div>
  );
};

export default withRouter(
  class SearchEngine extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        value: "",
        suggestions: []
      };
      this.onChange = this.onChange.bind(this);
      this.onSuggestionsFetchRequested = this.onSuggestionsFetchRequested.bind(
        this
      );
      this.onSuggestionsClearRequested = this.onSuggestionsClearRequested.bind(
        this
      );
    }
    static async getInitialProps() {
      let firebase = await loadFirebase();

      let result = await new Promise((resolve, reject) => {
        firebase
          .firestore()
          .collection("Pages")
          .get()
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
    // Autosuggest will call this function every time you need to clear suggestions.
    onSuggestionsClearRequested = () => {
      this.setState({
        suggestions: []
      });
    };
    onChange = (event, { newValue }) => {
      this.setState({
        value: newValue
      });
    };

    render() {
      const data = this.props.data;
      const { value, suggestions } = this.state;
      const inputProps = {
        placeholder: "Sök här...",
        value,
        onChange: this.onChange
      };
      return (
        <Container>
          <Head>Sök | Partiguiden.nu</Head>
          <Autosuggest
            theme={AutosuggestTheme}
            suggestions={suggestions}
            onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
            onSuggestionsClearRequested={this.onSuggestionsClearRequested}
            getSuggestionValue={getSuggestValue}
            renderSuggestion={renderSuggestion}
            inputProps={inputProps}
          />
        </Container>
      );
    }
  }
);
