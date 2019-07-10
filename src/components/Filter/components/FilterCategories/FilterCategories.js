import React from 'react';
import { Checkbox, List, ListItem, ListItemText, ListItemIcon } from '@material-ui/core';

import { table } from '../../../../utils/authorityTable';
import { useFilter } from '../../../FilterContainer';

const FilterCategories = () => {
  const [{ org }, dispatch] = useFilter();

  const renderCheckBox = object => (
    <ListItem
      key={object}
      dense
      disableGutters
      button
      onClick={() => {
        window.scrollTo(0, 0);
        if (org.includes(object)) dispatch({ type: 'REMOVE_ORG_FROM_FILTER', org: object });
        else dispatch({ type: 'ADD_ORG_TO_FILTER', org: object });
      }}
    >
      <ListItemIcon style={{ minWidth: '46px' }}>
        <Checkbox color="primary" checked={org.includes(object)} disableRipple />
      </ListItemIcon>
      <ListItemText
        disableTypography
        style={{ fontSize: '0.9rem', marginRight: '1rem', lineHeight: 1.5 }}
      >
        {table[object].desc}
      </ListItemText>
    </ListItem>
  );

  return <List disablePadding>{Object.keys(table).map(object => renderCheckBox(object))}</List>;
};

export default FilterCategories;
