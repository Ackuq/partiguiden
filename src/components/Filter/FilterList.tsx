import React from 'react';

import { Checkbox, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  itemIcon: {
    minWidth: '46px',
  },
  itemText: {
    fontSize: '0.9rem',
    marginRight: '1rem',
    lineHeight: 1.5,
    pointerEvents: 'none',
  },
});

interface Props {
  list: Array<unknown>;
  updateList: (element: never) => void;
  isChecked: (element: never) => boolean;
  getText: (element: never) => string;
  getKey: (element: never) => string;
}

const FilterList: React.FC<Props> = ({ list, updateList, isChecked, getText, getKey }) => {
  const classes = useStyles();

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
      <ListItemIcon classes={{ root: classes.itemIcon }}>
        <Checkbox
          inputProps={{ id: `${getKey(el)}-input` }}
          color="primary"
          checked={isChecked(el)}
          disableRipple
        />
      </ListItemIcon>
      <ListItemText disableTypography classes={{ root: classes.itemText }}>
        <label htmlFor={`${getKey(el)}-input`}>{getText(el)}</label>
      </ListItemText>
    </ListItem>
  );

  return (
    <List component="div" disablePadding>
      {list.map((el) => renderCheckBox(el as never))}
    </List>
  );
};

export default FilterList;
