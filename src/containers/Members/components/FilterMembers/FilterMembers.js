import React from 'react';
import { Checkbox, List, ListItem, ListItemText, ListItemIcon } from '@material-ui/core';

import FilterContainer, { useFilter } from '../../../../components/FilterContainer';
import getParties from '../../../../utils/getParties';

const FilterMembers = () => {
  const [{ parties }, dispatch] = useFilter();

  const renderCheckBox = party => (
    <ListItem
      key={party.name}
      dense
      disableGutters
      button
      onClick={() => {
        window.scrollTo(0, 0);
        if (parties.includes(party.letter))
          dispatch({ type: 'REMOVE_MEMBER_PARTY', party: party.letter });
        else dispatch({ type: 'SET_MEMBER_PARTY', party: party.letter });
      }}
    >
      <ListItemIcon style={{ minWidth: '46px' }}>
        <Checkbox color="primary" checked={parties.includes(party.letter)} disableRipple />
      </ListItemIcon>
      <ListItemText
        disableTypography
        style={{ fontSize: '0.9rem', marginRight: '1rem', lineHeight: 1.5 }}
      >
        {party.name}
      </ListItemText>
    </ListItem>
  );

  return (
    <FilterContainer>
      <List disablePadding>
        {[...getParties, { name: 'Partilösa', letter: '-' }].map(object => renderCheckBox(object))}
      </List>
    </FilterContainer>
  );
};

export default FilterMembers;
