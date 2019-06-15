import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Input, InputAdornment } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

import { useStateValue } from '../../../../lib/stateProvider';
import styles from './styles';

const FilterSearch = ({ classes }) => {
  const [{ filter }, dispatch] = useStateValue();

  return (
    <div className={classes.filterSearch}>
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

export default withStyles(styles)(FilterSearch);
