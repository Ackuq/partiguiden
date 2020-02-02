import React from 'react';

import InputBase from '@material-ui/core/InputBase';
import InputAdornment from '@material-ui/core/InputAdornment';

import SearchIcon from '@material-ui/icons/Search';

interface Props {
  search: string;
  updateSearch: (value: string) => any;
}

const FilterSearch = ({ search, updateSearch }) => (
  <div style={{ padding: '0.5rem 1rem 0 1rem' }}>
    <InputBase
      value={search}
      onChange={event => {
        window.scrollTo(0, 0);
        updateSearch(event.target.value);
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
  </div>
);

export default FilterSearch;
