import Autosuggest from "react-autosuggest";
import { Link, Router } from "../lib/routes";

import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import ButtonBase from "@material-ui/core/ButtonBase";

import SearchIcon from "@material-ui/icons/Search";

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
    <Link route="subject" params={{ id: `${suggestion.id}` }}>
      <a className="search-result">{suggestion.name}</a>
    </Link>
  );
};
function renderSuggestionsContainer({ containerProps, children, query }) {
  return (
    <div {...containerProps}>
      {children}
      <div>
        <strong>{query}</strong>
      </div>
    </div>
  );
}

const renderInputComponent = inputProps => (
  <Input fullWidth={true} {...inputProps} />
);

export default class SearchEngine extends React.Component {
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
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: getSuggestions(value, this.props.searchData)
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

  handleSubmit = e => {
    this.props.closeNav();

    e.preventDefault();
    let val = this.state.value;
    let suggestions = this.props.searchData;
    var id;
    /* Check if found equals one of the suggestions  */
    let found = suggestions.some(function(el) {
      if (el.name.toLowerCase() === val.toLowerCase()) {
        id = el.id;
        return true;
      }
    });
    if (found) {
      Router.pushRoute(`/subject/${id}`);
    } else {
      Router.pushRoute(`/search?query=${val}`);
    }
  };

  render() {
    const data = this.props.searchData;
    const { value, suggestions } = this.state;
    const inputProps = {
      placeholder: "Sök här...",
      value,
      onChange: this.onChange,
      endAdornment: (
        <InputAdornment position="end">
          <button className="search-button">
            <SearchIcon />
          </button>
        </InputAdornment>
      )
    };
    return (
      <form id={`search-${this.props.id}`} onSubmit={this.handleSubmit}>
        <Autosuggest
          id={this.props.id}
          suggestions={suggestions}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          getSuggestionValue={getSuggestValue}
          renderSuggestion={renderSuggestion}
          renderInputComponent={renderInputComponent}
          inputProps={inputProps}
        />
      </form>
    );
  }
}
