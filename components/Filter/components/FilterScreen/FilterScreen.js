import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';

import styles from './styles';
import FilterCategory from '../FilterCategories/FilterCategories';

const FilterScreen = ({ classes, show }) => {
  const [showState, setShowState] = useState(show);

  if (show !== showState) setShowState(show);

  const showClass = showState ? classes.showFilterScreen : '';

  return (
    <div className={`${classes.filterScreenContainer} ${showClass}`}>
      <FilterCategory />
    </div>
  );
};

export default withStyles(styles)(FilterScreen);
