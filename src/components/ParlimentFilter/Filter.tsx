import React, { useCallback } from 'react';
import { Divider } from '@material-ui/core';
import { NextRouter } from 'next/router';

import { authorityTable } from '../../utils';
import FilterContainer, { FilterSearch, FilterList } from '../Filter';

interface Props {
  router: NextRouter;
  search: string;
  org: Array<string>;
}

const Filter: React.FC<Props> = ({ router, search, org }) => {
  const updateRoute = useCallback(
    (newSearch: typeof search, newOrg: typeof org) => {
      const searchString = newSearch && `sok=${newSearch}`;
      const orgString = newOrg.length > 0 && `org=${newOrg.join('&org=')}`;
      let href = '';

      if (searchString || orgString) {
        href += '?';
        if (searchString) {
          href += searchString;
          if (orgString) href += '&';
        }
        if (orgString) href += orgString;
      }

      router.push(`${router.route}${href}`);
    },
    [router]
  );

  const updateSearch = (value: string) => {
    updateRoute(value, org);
  };

  const isChecked = (el: string) => org.includes(el);
  const updateList = (el: string) => {
    if (isChecked(el)) {
      updateRoute(
        search,
        org.filter((item) => item !== el)
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
