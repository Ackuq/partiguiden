import Checkbox from "@mui/material/Checkbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

interface Props {
  list: Array<unknown>;
  updateList: (element: never) => void;
  isChecked: (element: never) => boolean;
  getText: (element: never) => string;
  getKey: (element: never) => string;
}

const FilterList: React.FC<Props> = ({
  list,
  updateList,
  isChecked,
  getText,
  getKey,
}) => {
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
      <ListItemIcon sx={{ minWidth: "46px" }}>
        <Checkbox
          inputProps={{ id: `${getKey(el)}-input` }}
          color="primary"
          checked={isChecked(el)}
          disableRipple
        />
      </ListItemIcon>
      <ListItemText
        disableTypography
        sx={{
          fontSize: "0.9rem",
          marginRight: "1rem",
          lineHeight: 1.5,
          pointerEvents: "none",
        }}
      >
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
