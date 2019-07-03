import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { FormGroup, FormControlLabel, Checkbox } from '@material-ui/core';

import FilterContainer, { useFilter } from '../../../../components/FilterContainer';
import getParties from '../../../../utils/getParties';
import styles from './styles';

const useStyles = makeStyles(styles);

const FilterMembers = () => {
  const classes = useStyles();
  const [{ parties }, dispatch] = useFilter();

  const renderCheckBox = party => (
    <FormControlLabel
      key={party.name}
      classes={{ root: classes.checkBox, label: classes.label }}
      control={
        <Checkbox
          color="primary"
          checked={parties.includes(party.letter)}
          onChange={event => {
            window.scrollTo(0, 0);
            if (event.target.checked) dispatch({ type: 'SET_MEMBER_PARTY', party: party.letter });
            else dispatch({ type: 'REMOVE_MEMBER_PARTY', party: party.letter });
          }}
        />
      }
      label={party.name}
    />
  );

  return (
    <FilterContainer>
      <div className={classes.catergoryContainer}>
        <FormGroup classes={{ root: classes.formGroupRoot }}>
          {[...getParties, { name: 'Partilösa', letter: '-' }].map(object =>
            renderCheckBox(object)
          )}
        </FormGroup>
      </div>
    </FilterContainer>
  );
};

export default FilterMembers;
