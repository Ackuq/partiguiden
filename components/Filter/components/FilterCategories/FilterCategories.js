import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { table } from '../../../../lib/authorityTable';

import { useStateValue } from '../../../../lib/stateProvider';

import styles from './styles';

const FilterCategories = ({ classes, loadAll }) => {
  const [{ filter }, dispatch] = useStateValue();

  const renderCheckBox = object => (
    <FormControlLabel
      key={object}
      classes={{ root: classes.checkBox }}
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
        {Object.keys(table)
          .slice(0, 5)
          .map(object => renderCheckBox(object))}

        {loadAll &&
          Object.keys(table)
            .slice(5, table.length)
            .map(object => renderCheckBox(object))}
      </FormGroup>
    </div>
  );
};

export default withStyles(styles)(FilterCategories);
