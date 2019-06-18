import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { FormGroup, FormControlLabel, Checkbox } from '@material-ui/core';

import { table } from '../../../../utils/authorityTable';
import { useStateValue } from '../../../../lib/stateProvider';
import styles from './styles';

const useStyles = makeStyles(styles);

const FilterCategories = () => {
  const classes = useStyles();
  const [{ filter }, dispatch] = useStateValue();

  const renderCheckBox = object => (
    <FormControlLabel
      key={object}
      classes={{ root: classes.checkBox, label: classes.label }}
      control={
        <Checkbox
          color="primary"
          checked={filter.org.includes(object)}
          onChange={event => {
            window.scrollTo(0, 0);
            if (event.target.checked) dispatch({ type: 'ADD_ORG_TO_FILTER', org: object });
            else dispatch({ type: 'REMOVE_ORG_FROM_FILTER', org: object });
          }}
        />
      }
      label={table[object].desc}
    />
  );

  return (
    <div className={classes.catergoryContainer}>
      <FormGroup classes={{ root: classes.formGroupRoot }}>
        {Object.keys(table).map(object => renderCheckBox(object))}
      </FormGroup>
    </div>
  );
};

export default FilterCategories;
