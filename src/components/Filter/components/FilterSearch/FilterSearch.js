import React from 'react';
import { Input, InputAdornment } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

import { useStateValue } from '../../../../lib/stateProvider';

const FilterSearch = () => {
  const [{ filter }, dispatch] = useStateValue();

  return (
    <div style={{ margin: '0.5rem 1rem' }}>
      <Input
        value={filter.search}
        onChange={event => {
          window.scrollTo(0, 0);
          dispatch({ type: 'SET_SEARCH', searchInput: event.target.value });
        }}
        fullWidth
        placeholder="Sök..."
        endAdornment={
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        }
      />
    </div>
  );
};

export default FilterSearch;
