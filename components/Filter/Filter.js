import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import FilterIcon from '@material-ui/icons/FilterList';
import styles from './styles';

import { FilterScreen } from './components';

const Filter = ({ classes }) => {
  const [showFilterScreen, setShowFilterScreen] = useState(false);

  return (
    <React.Fragment>
      <Card className={classes.filterContainer}>
        <Button
          classes={{ root: classes.buttonContainer }}
          onClick={() => setShowFilterScreen(!showFilterScreen)}
        >
          <FilterIcon className={classes.icon} />
        </Button>
      </Card>
      <FilterScreen show={showFilterScreen} />
    </React.Fragment>
  );
};

export default withStyles(styles)(Filter);
