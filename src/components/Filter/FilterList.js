import React from 'react';
import { Checkbox, List, ListItem, ListItemText, ListItemIcon } from '@material-ui/core';
import { oneOfType, array, object, func } from 'prop-types';

const FilterList = ({ list, updateList, isChecked, getText, getKey }) => {
  const renderCheckBox = el => (
    <ListItem
      key={getKey(el)}
      dense
      disableGutters
      button
      onClick={() => {
        window.scrollTo(0, 0);
        updateList(el);
      }}
    >
      <ListItemIcon style={{ minWidth: '46px' }}>
        <Checkbox color="primary" checked={isChecked(el)} disableRipple />
      </ListItemIcon>
      <ListItemText
        disableTypography
        style={{ fontSize: '0.9rem', marginRight: '1rem', lineHeight: 1.5 }}
      >
        {getText(el)}
      </ListItemText>
    </ListItem>
  );

  return <List disablePadding>{list.map(el => renderCheckBox(el))}</List>;
};

FilterList.propTypes = {
  list: oneOfType([object, array]).isRequired,
  updateList: func.isRequired,
  isChecked: func.isRequired,
  getText: func.isRequired,
  getKey: func.isRequired,
};

export default FilterList;
