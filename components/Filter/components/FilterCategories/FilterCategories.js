import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { table } from '../../../../lib/authorityTable';

import { useStateValue } from '../../../../lib/stateProvider';

import styles from './styles';

const FilterCategories = ({ classes }) => {
  const [{ filter }, dispatch] = useStateValue();
  return (
    <div className={classes.catergoryContainer}>
      <FormGroup>
        {table.map(object => (
          <FormControlLabel
            key={object.code}
            control={
              <Checkbox
                color="primary"
                checked={filter.org.includes(object.code)}
                onChange={event => {
                  if (event.target.checked)
                    dispatch({ type: 'ADD_ORG_TO_FILTER', org: object.code });
                  else dispatch({ type: 'REMOVE_ORG_FROM_FILTER', org: object.code });
                }}
              />
            }
            label={object.desc}
          />
        ))}
      </FormGroup>
    </div>
  );
};

export default withStyles(styles)(FilterCategories);
