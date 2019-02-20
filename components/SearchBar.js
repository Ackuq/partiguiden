import { loadFirebase } from "../lib/db.js";
import Autosuggest from "react-autosuggest";
import { AutosuggestTheme } from "../styles/AutosuggestTheme.css";
import { Link } from "../lib/routes";

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
        Press Enter to search <strong>{query}</strong>
      </div>
    </div>
  );
}

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

  render() {
    const data = this.props.searchData;
    const { value, suggestions } = this.state;
    const inputProps = {
      placeholder: "Sök här...",
      value,
      onChange: this.onChange
    };
    return (
      <Autosuggest
        theme={AutosuggestTheme}
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        highlightFirstSuggestion={true}
        getSuggestionValue={getSuggestValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
      />
    );
  }
}
