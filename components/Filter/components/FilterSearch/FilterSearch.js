import React from 'react';

import { withStyles } from '@material-ui/core/styles';

import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';

import { useStateValue } from '../../../../lib/stateProvider';

import styles from './styles';

const FilterSearch = ({ classes }) => {
  const dispatch = useStateValue()[1];

  return (
    <div className={classes.filterSearch}>
      <Input
        onChange={event => dispatch({ type: 'SET_SEARCH', searchInput: event.target.value })}
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
