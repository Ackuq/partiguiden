import React, { useState, useEffect } from 'react';
/* Routing */
import { withRouter } from 'next/router';
import { withStyles } from '@material-ui/core/styles';

/* Autosuggest */
import Autosuggest from 'react-autosuggest';

/* Material UI components */
import InputBase from '@material-ui/core/InputBase';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import { Link, Router } from '../../../../../../lib/routes';

import { useStateValue } from '../../../../../../lib/stateProvider';

import styles from './styles';

const getSuggestions = (value, data) => {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;
  return inputLength === 0
    ? []
    : data.filter(subject => subject.name.toLowerCase().slice(0, inputLength) === inputValue);
};

const getSuggestValue = suggestion => {
  return suggestion.name;
};

const SearchBar = ({ classes, id }) => {
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [data, setData] = useState([]);
  const { subjectData } = useStateValue()[0];

  useEffect(() => {
    subjectData.then(result => {
      const temp = [];
      Object.keys(result).forEach(key => {
        temp.push({ id: key, name: result[key].name });
      });
      setData(temp);
    });
  }, []);

  const onSuggestionsFetchRequested = ({ value }) => {
    setSuggestions(getSuggestions(value, data));
  };

  // Autosuggest will call this function every time you need to clear suggestions.
  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const handleChange = (event, { newValue }) => {
    setInputValue(newValue);
  };

  const handleSubmit = event => {
    event.preventDefault();
    let subject;

    /* Check if found equals one of the suggestions  */
    const found = suggestions.some(el => {
      if (el.name.toLowerCase() === inputValue.toLowerCase()) {
        subject = el.id;
        return true;
      }
      return false;
    });
    if (found) {
      Router.pushRoute(`/subject/${subject}`);
    }
  };

  const onKeyDown = event => {
    if (event.key === 'Enter') {
      handleSubmit(event);
    }
  };

  const renderSuggestion = (suggestion, { isHighlighted }) => (
    <MenuItem
      classes={{
        root: classes.menuItem
      }}
      selected={isHighlighted}
      component="div"
      disableGutters
    >
      <Link route="subject" params={{ id: `${suggestion.id}` }}>
        <a className="search-result">{suggestion.name}</a>
      </Link>
    </MenuItem>
  );

  const renderInputComponent = ({ ref, ...other }) => (
    <InputBase
      classes={{
        root: classes.inputRoot,
        input: classes.inputComp,
        focused: classes.inputFocused
      }}
      {...other}
      inputRef={node => {
        ref(node);
      }}
    />
  );

  const inputProps = {
    placeholder: 'Sök här...',
    value: inputValue,
    inputProps: {
      'aria-label': 'search bar'
    },
    variant: 'filled',
    color: 'primary',
    onKeyDown,
    onChange: handleChange,
    id: 'search-bar',
    endAdornment: (
      <InputAdornment position="end">
        <SearchIcon nativeColor="#ffffff" />
      </InputAdornment>
    )
  };
  return (
    <Autosuggest
      id={id}
      theme={{
        container: classes.container,
        suggestionsContainerOpen: classes.suggestionsContainerOpen,
        suggestionsList: classes.suggestionsList,
        suggestion: classes.suggestion
      }}
      suggestions={suggestions}
      onSuggestionsFetchRequested={onSuggestionsFetchRequested}
      onSuggestionsClearRequested={onSuggestionsClearRequested}
      onSuggestionSelected={handleSubmit}
      getSuggestionValue={getSuggestValue}
      renderSuggestionsContainer={option => (
        <Paper {...option.containerProps}>{option.children}</Paper>
      )}
      renderSuggestion={renderSuggestion}
      renderInputComponent={renderInputComponent}
      inputProps={inputProps}
    />
  );
};

export default withStyles(styles)(withRouter(SearchBar));

/*
export default withStyles(styles)(
  withRouter(
    class SearchBar extends React.Component {
      constructor(props) {
        super(props);
        this.state = {
          value: '',
          suggestions: [],
          data: []
        };
        this.handleChange = this.handleChange.bind(this);
        this.onSuggestionsFetchRequested = this.onSuggestionsFetchRequested.bind(this);
        this.onSuggestionsClearRequested = this.onSuggestionsClearRequested.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.renderInputComponent = this.renderInputComponent.bind(this);
        this.getInitialData = this.getInitialData.bind(this);
      }

      componentDidMount() {
        this.getInitialData();
      }

      async getInitialData() {
        const result = await new Promise(resolve => {
          firebase
            .firestore()
            .collection('Data')
            .doc('Pages')
            .onSnapshot({ includeMetadataChanges: true }, snapshot => {
              const data = [];
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

      render() {
        const { value, suggestions } = this.state;
        const { classes } = this.props;

        const inputProps = {
          placeholder: 'Sök här...',
          value,
          inputProps: {
            'aria-label': 'search bar'
          },
          variant: 'filled',
          color: 'primary',
          onKeyDown: this.onKeyDown,
          onChange: this.handleChange,
          id: 'search-bar',
          endAdornment: (
            <InputAdornment position="end">
              <SearchIcon nativeColor="#ffffff" />
            </InputAdornment>
          )
        };

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
*/
