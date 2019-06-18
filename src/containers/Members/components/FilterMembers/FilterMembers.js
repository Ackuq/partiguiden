import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { FormGroup, FormControlLabel, Checkbox } from '@material-ui/core';

import FilterContainer from '../../../../components/FilterContainer';
import { useStateValue } from '../../../../lib/stateProvider';
import parties from '../../../../utils/getParties';
import styles from './styles';

const useStyles = makeStyles(styles);

const FilterMembers = () => {
  const classes = useStyles();
  const [{ memberFilter }, dispatch] = useStateValue();

  const renderCheckBox = party => (
    <FormControlLabel
      key={party.name}
      classes={{ root: classes.checkBox, label: classes.label }}
      control={
        <Checkbox
          color="primary"
          checked={memberFilter.parties.includes(party.letter)}
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
          {[...parties, { name: 'Partilösa', letter: '-' }].map(object => renderCheckBox(object))}
        </FormGroup>
      </div>
    </FilterContainer>
  );
};

export default FilterMembers;
