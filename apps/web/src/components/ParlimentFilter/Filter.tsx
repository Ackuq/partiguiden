import React, { useCallback } from "react";

import Divider from "@mui/material/Divider";

import type { NextRouter } from "next/router";
import { stringify } from "querystring";

import { authorityTable } from "../../utils";
import FilterContainer from "../Filter/FilterContainer";
import FilterList from "../Filter/FilterList";
import FilterSearch from "../Filter/FilterSearch";

interface Props {
  router: NextRouter;
  search: string;
  org: Array<string>;
}

const Filter: React.FC<Props> = ({ router, search, org }) => {
  const updateRoute = useCallback(
    (newSearch: typeof search, newOrg: typeof org) => {
      const query = { ...router.query, search: newSearch, org: newOrg };
      router.push(`${router.route}?${stringify(query)}`);
    },
    [router],
  );

  const updateSearch = (value: string) => {
    updateRoute(value, org);
  };

  const isChecked = (el: string) => org.includes(el);
  const updateList = (el: string) => {
    if (isChecked(el)) {
      updateRoute(
        search,
        org.filter((item) => item !== el),
      );
    } else {
      updateRoute(search, [...org, el]);
    }
  };
  const getText = (el: string) => authorityTable[el].desc;
  const getKey = (el: string) => el;

  return (
    <FilterContainer>
      <FilterSearch updateSearch={updateSearch} search={search} />
      <Divider />
      <FilterList
        list={Object.keys(authorityTable)}
        isChecked={isChecked}
        updateList={updateList}
        getText={getText}
        getKey={getKey}
      />
    </FilterContainer>
  );
};

export default Filter;
