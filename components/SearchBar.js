/* Routing */
import { Link, Router } from "../lib/routes";
import { withRouter } from "next/router";
import { withTheme } from "@material-ui/core/styles";

/* Autosuggest */
import Autosuggest from "react-autosuggest";

/* Material UI components */
import InputLabel from "@material-ui/core/InputLabel";
import InputBase from "@material-ui/core/InputBase";
import InputAdornment from "@material-ui/core/InputAdornment";
import ButtonBase from "@material-ui/core/ButtonBase";
import SearchIcon from "@material-ui/icons/Search";
import Paper from "@material-ui/core/Paper";
import MenuItem from "@material-ui/core/MenuItem";

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
const renderSuggestion = (suggestion, { isHighlighted }) => {
  return (
    <MenuItem selected={isHighlighted} component="div" disableGutters={true}>
      <Link route="subject" params={{ id: `${suggestion.id}` }}>
        <a className="search-result">{suggestion.name}</a>
      </Link>
    </MenuItem>
  );
};
function renderSuggestionsContainer({ containerProps, children, query }) {
  return (
    <div {...containerProps}>
      {children}
      <div>{query}</div>
    </div>
  );
}

const renderInputComponent = inputProps => {
  const { ref, ...other } = inputProps;
  return (
    <InputLabel htmlFor="search-bar">
      <InputBase
        className="input-field-header"
        {...other}
        inputRef={node => {
          ref(node);
        }}
      />
    </InputLabel>
  );
};

export default withTheme()(
  withRouter(
    class SearchBar extends React.Component {
      constructor(props) {
        super(props);
        this.state = {
          value: "",
          suggestions: []
        };
        this.handleChange = this.handleChange.bind(this);
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
      handleChange = (event, { newValue }) => {
        this.setState({
          value: newValue
        });
      };

      handleSubmit = e => {
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
        }
      };

      render() {
        const { value, suggestions } = this.state;
        const inputProps = {
          placeholder: "Sök här...",
          value,
          inputProps: {
            label: "searchbar"
          },
          variant: "filled",
          color: "primary",
          onChange: this.handleChange,
          id: "search-bar",
          endAdornment: (
            <InputAdornment position="end">
              <SearchIcon nativeColor="#ffffff" />
            </InputAdornment>
          )
        };

        return (
          <Autosuggest
            id={this.props.id}
            suggestions={suggestions}
            onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
            onSuggestionsClearRequested={this.onSuggestionsClearRequested}
            onSuggestionSelected={this.handleSubmit}
            getSuggestionValue={getSuggestValue}
            renderSuggestionsContainer={option => (
              <Paper {...option.containerProps}>{option.children}</Paper>
            )}
            renderSuggestion={renderSuggestion}
            renderInputComponent={renderInputComponent}
            inputProps={inputProps}
          />
        );
      }
    }
  )
);
