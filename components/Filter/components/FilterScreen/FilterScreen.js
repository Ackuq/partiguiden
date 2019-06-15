import React, { useState, useRef } from 'react';
import { withStyles } from '@material-ui/core/styles';

import styles from './styles';
import { FilterCategories, FilterCategoriesButtons } from '../FilterCategories';
import FilterSearch from '../FilterSearch';
import useOnClickOutside from '../../lib/useOnClickOutside';

const FilterScreen = ({ classes, show, handleClick }) => {
  const [showState, setShowState] = useState(show);
  const [loadAll, setLoadAll] = useState(false);

  if (show !== showState) setShowState(show);

  const showClass = showState ? classes.showFilterScreen : '';

  const ref = useRef();

  useOnClickOutside(ref, handleClick);

  return (
    <div ref={ref} className={`${classes.filterScreenContainer} ${showClass}`}>
      <FilterSearch />
      <FilterCategories loadAll={loadAll} />
      <FilterCategoriesButtons loadAll={loadAll} setLoadAll={setLoadAll} />
    </div>
  );
};

export default withStyles(styles)(FilterScreen);
