import React from 'react';

import { InputBase, InputAdornment } from '@material-ui/core';

import { Search as SearchIcon } from '@material-ui/icons';

interface Props {
  search: string;
  updateSearch: (value: string) => void;
}

const FilterSearch: React.FC<Props> = ({ search, updateSearch }) => (
  <div style={{ padding: '0.5rem 1rem 0 1rem' }}>
    <InputBase
      value={search}
      onChange={(event) => {
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
