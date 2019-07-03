import React from 'react';
import { Input, InputAdornment } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

import { useFilter } from '../../../FilterContainer';

const FilterSearch = () => {
  const [{ search }, dispatch] = useFilter();

  return (
    <div style={{ margin: '0.5rem 0.75rem' }}>
      <Input
        value={search}
        onChange={event => {
          window.scrollTo(0, 0);
          dispatch({ type: 'SET_SEARCH', searchInput: event.target.value });
        }}
        fullWidth
        placeholder="Sök..."
        startAdornment={
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        }
      />
    </div>
  );
};

export default FilterSearch;
