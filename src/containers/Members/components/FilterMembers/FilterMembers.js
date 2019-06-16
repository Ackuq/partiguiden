import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { FormGroup, FormControlLabel, Radio, Button } from '@material-ui/core';
import ClearIcon from '@material-ui/icons/ClearRounded';

import FilterContainer from '../../../../components/FilterContainer';
import { useStateValue } from '../../../../lib/stateProvider';
import parties from '../../../../utils/getParties';
import styles from './styles';

const FilterMembers = ({ classes }) => {
  const [{ memberFilter }, dispatch] = useStateValue();

  const renderCheckBox = party => (
    <FormControlLabel
      key={party.name}
      classes={{ root: classes.checkBox, label: classes.label }}
      control={
        <Radio
          color="primary"
          checked={memberFilter.party === party.letter}
          onChange={() => {
            window.scrollTo(0, 0);
            dispatch({ type: 'SET_MEMBER_PARTY', party: party.letter });
          }}
        />
      }
      label={party.name}
    />
  );

  return (
    <FilterContainer>
      <Button
        onClick={() => dispatch({ type: 'REMOVE_MEMBER_PARTY' })}
        style={{ borderRadius: 0, justifyContent: 'flex-start' }}
      >
        <ClearIcon color="error" />
        <span style={{ marginLeft: '10px' }}>Rensa filter</span>
      </Button>
      <div className={classes.catergoryContainer}>
        <FormGroup classes={{ root: classes.formGroupRoot }}>
          {parties.map(object => renderCheckBox(object))}
        </FormGroup>
      </div>
    </FilterContainer>
  );
};

export default withStyles(styles)(FilterMembers);
