import React from 'react';
import { InputBase, InputAdornment, Box } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

import { useFilter } from '../../../FilterContainer';

const FilterSearch = () => {
  const [{ search }, dispatch] = useFilter();

  return (
    <Box pt={1} px={2}>
      <InputBase
        value={search}
        onChange={event => {
          window.scrollTo(0, 0);
          dispatch({ type: 'SET_SEARCH', searchInput: event.target.value });
        }}
        style={{ fontSize: '1.25rem' }}
        fullWidth
        placeholder="Sök..."
        startAdornment={
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        }
      />
    </Box>
  );
};

export default FilterSearch;
