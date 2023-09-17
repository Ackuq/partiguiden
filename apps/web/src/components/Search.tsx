import React, { useEffect, useState } from "react";

import InputAdornment from "@mui/material/InputAdornment";
import type { TextFieldProps } from "@mui/material/TextField";
import TextField from "@mui/material/TextField";

import SearchIcon from "@mui/icons-material/Search";

import type { SubjectList } from "../types/subjects";
import { searchSubjects } from "../lib/api";

interface Props {
  setSearchResult: React.Dispatch<React.SetStateAction<SubjectList>>;
}

const Search: React.FC<Props> = ({ setSearchResult }) => {
  const [searchText, setSearchText] = useState<string>();

  useEffect(() => {
    const controller = new AbortController();
    if (searchText !== undefined) {
      const { signal } = controller;
      searchSubjects(searchText, signal)
        .then((result) => {
          setSearchResult(result);
        })
        .catch((e) => {
          /* Ignore abort errors */
          if (e.name === "AbortError") {
            return;
          }
          throw e;
        });
    }
    return () => {
      controller.abort();
    };
  }, [searchText, setSearchResult]);

  const onTextChange: TextFieldProps["onChange"] = (event) => {
    setSearchText(event.target.value);
  };

  return (
    <TextField
      variant="standard"
      placeholder="Sök"
      fullWidth
      onChange={onTextChange}
      InputProps={{
        sx: {
          padding: "0.25rem 0.5rem",
        },
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
    />
  );
};

export default Search;
