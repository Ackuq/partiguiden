/* Routing */
import { Link, Router } from "../../lib/routes";
import { withRouter } from "next/router";
import { withStyles } from "@material-ui/core/styles";
import firebase from "../../lib/db.js";

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
function renderSuggestionsContainer({ containerProps, children, query }) {
  return (
    <div {...containerProps}>
      {children}
      <div>{query}</div>
    </div>
  );
}

const searchStyles = theme => ({
  inputRoot: {
    [theme.breakpoints.down("sm")]: {
      width: "100%"
    },
    [theme.breakpoints.up("md")]: {
      width: "75%"
    },
    float: "right",
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.12)",
    transition: "width 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
    "-webkit-transition": "width 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
    "-moz-transition": "width 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
    "-ms-transition": "width 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
    "-o-transition": "width 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
    backgroundColor: "#009688",
    borderRadius: "4px",
    padding: "0.25rem 0.5rem"
  },
  inputComp: {
    color: "#ffffff",
    backgroundColor: "#009688",
    "&::placeholder": {
      opacity: "0.8"
    }
  },
  menuItem: {
    width: "100%"
  },
  container: {
    [theme.breakpoints.down("sm")]: {
      width: "100%"
    }
  },
  suggestionsContainerOpen: {
    [theme.breakpoints.down("sm")]: {
      width: "calc(100% - 1rem)"
    },
    position: "absolute",
    top: "56px",
    width: "230px"
  },
  suggestionsList: {
    margin: "0",
    padding: "0",
    fontSize: "1rem"
  },
  suggestion: {
    display: "flex",
    "& a": {
      color: "#212121",
      width: "100%",
      padding: "0.75rem 1rem"
    }
  }
});

export default withStyles(searchStyles)(
  withRouter(
    class SearchBar extends React.Component {
      constructor(props) {
        super(props);
        this.state = {
          value: "",
          suggestions: [],
          data: []
        };
        this.handleChange = this.handleChange.bind(this);
        this.onSuggestionsFetchRequested = this.onSuggestionsFetchRequested.bind(
          this
        );
        this.onSuggestionsClearRequested = this.onSuggestionsClearRequested.bind(
          this
        );
        this.handleSubmit = this.handleSubmit.bind(this);
        this.renderInputComponent = this.renderInputComponent.bind(this);
        this.getInitialData = this.getInitialData.bind(this);
      }

      componentDidMount() {
        this.getInitialData();
      }

      async getInitialData() {
        let result = await new Promise(resolve => {
          firebase
            .firestore()
            .collection("Data")
            .doc("Pages")
            .onSnapshot({ includeMetadataChanges: true }, function(snapshot) {
              var data = [];
              Object.keys(snapshot.data()).forEach(map => {
                data.push(
                  Object.assign({
                    id: map,
                    name: snapshot.data()[map].name
                  })
                );
              });
              resolve(data);
            });
        });
        this.setState({ data: result });
      }

      renderInputComponent = inputProps => {
        const { ref, ...other } = inputProps;
        const { inputRoot } = this.props.classes;
        return (
          <InputBase
            classes={{
              root: this.props.classes.inputRoot,
              input: this.props.classes.inputComp
            }}
            {...other}
            inputRef={node => {
              ref(node);
            }}
          />
        );
      };

      renderSuggestion = (suggestion, { isHighlighted }) => {
        return (
          <MenuItem
            classes={{
              root: this.props.classes.menuItem
            }}
            selected={isHighlighted}
            component="div"
            disableGutters={true}
          >
            <Link route="subject" params={{ id: `${suggestion.id}` }}>
              <a className="search-result">{suggestion.name}</a>
            </Link>
          </MenuItem>
        );
      };

      onSuggestionsFetchRequested = ({ value }) => {
        this.setState({
          suggestions: getSuggestions(value, this.state.data)
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

      onKeyDown = event => {
        if (event.key == "Enter") {
          this.handleSubmit(event);
        }
      };

      handleSubmit = e => {
        e.preventDefault();
        let val = this.state.value;
        let suggestions = this.state.data;
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
          onKeyDown: this.onKeyDown,
          onChange: this.handleChange,
          id: "search-bar",
          endAdornment: (
            <InputAdornment position="end">
              <SearchIcon nativeColor="#ffffff" />
            </InputAdornment>
          )
        };
        const classes = this.props.classes;
        return (
          <Autosuggest
            id={this.props.id}
            theme={{
              container: classes.container,
              suggestionsContainerOpen: classes.suggestionsContainerOpen,
              suggestionsList: classes.suggestionsList,
              suggestion: classes.suggestion
            }}
            suggestions={suggestions}
            onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
            onSuggestionsClearRequested={this.onSuggestionsClearRequested}
            onSuggestionSelected={this.handleSubmit}
            getSuggestionValue={getSuggestValue}
            renderSuggestionsContainer={option => (
              <Paper {...option.containerProps}>{option.children}</Paper>
            )}
            renderSuggestion={this.renderSuggestion}
            renderInputComponent={this.renderInputComponent}
            inputProps={inputProps}
          />
        );
      }
    }
  )
);
