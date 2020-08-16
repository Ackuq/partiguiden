import React from 'react';

import Checkbox from '@material-ui/core/Checkbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

interface Props {
  list: Array<unknown>;
  updateList: (element: never) => void;
  isChecked: (element: never) => boolean;
  getText: (element: never) => string;
  getKey: (element: never) => string;
}

const FilterList: React.FC<Props> = ({ list, updateList, isChecked, getText, getKey }) => {
  const renderCheckBox = (el: never) => (
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

  return <List disablePadding>{list.map((el) => renderCheckBox(el as never))}</List>;
};

export default FilterList;
