import React, { useState, useEffect } from 'react';

import { InputAdornment, TextField, TextFieldProps } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import SearchIcon from '@material-ui/icons/Search';

import { SubjectList } from '../../types/subjects';
import { searchSubjects } from '../../lib/api';

const useStyles = makeStyles({
  input: {
    padding: '0.25rem 0.5rem',
  },
});

interface Props {
  setSearchResult: React.Dispatch<React.SetStateAction<SubjectList>>;
}

const Search: React.FC<Props> = ({ setSearchResult }) => {
  const classes = useStyles();

  const [searchText, setSearchText] = useState<string>();

  useEffect(() => {
    const controller = new AbortController();
    if (searchText !== undefined) {
      const { signal } = controller;
      searchSubjects(searchText, signal).then((result) => {
        setSearchResult(result);
      });
    }
    return () => {
      controller.abort();
    };
  }, [searchText, setSearchResult]);

  const onTextChange: TextFieldProps['onChange'] = (event) => {
    setSearchText(event.target.value);
  };

  return (
    <TextField
      placeholder="Sök"
      fullWidth
      onChange={onTextChange}
      InputProps={{
        classes: {
          root: classes.input,
        },
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
    />
  );
};

export default Search;
