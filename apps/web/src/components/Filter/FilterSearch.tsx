import InputAdornment from "@mui/material/InputAdornment";
import InputBase from "@mui/material/InputBase";

import SearchIcon from "@mui/icons-material/Search";

interface Props {
  search: string;
  updateSearch: (value: string) => void;
}

const FilterSearch: React.FC<Props> = ({ search, updateSearch }) => (
  <div style={{ padding: "0.5rem 1rem 0 1rem" }}>
    <InputBase
      value={search}
      onChange={(event) => {
        window.scrollTo(0, 0);
        updateSearch(event.target.value);
      }}
      style={{ fontSize: "1.25rem" }}
      fullWidth
      placeholder="Sök..."
      startAdornment={
        <InputAdornment position="start">
          <SearchIcon />
        </InputAdornment>
      }
    />
  </div>
);

export default FilterSearch;
