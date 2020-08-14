import React, { useCallback } from 'react';
import Divider from '@material-ui/core/Divider';

import { NextRouter } from 'next/router';
import FilterContainer, { FilterList, FilterSearch } from '../Filter';
import allParties from '../../utils/getParties';

type partyEntry = typeof allParties[number];

interface Props {
  router: NextRouter;
  parties: Array<string>;
  search: string;
}

const FilterMembers: React.FC<Props> = ({ router, search, parties }) => {
  const updateRoute = useCallback(
    (newSearch: typeof search, newParties: typeof parties) => {
      const searchString = newSearch && `sok=${newSearch}`;
      const partiesString = newParties.length > 0 && `party=${newParties.join('&party=')}`;
      let href = '';
      if (searchString || partiesString) {
        href += '?';
        if (searchString) {
          href += searchString;
          if (partiesString) {
            href += '&';
          }
        }
        if (partiesString) {
          href += partiesString;
        }
      }

      router.push(`${router.route}${href}`);
    },
    [router]
  );

  // Search functions
  const updateSearch = (value: string) => {
    updateRoute(value, parties);
  };
  // List functions
  const list = [...allParties, { name: 'Partilösa', letter: '-' }];
  const isChecked = (party: partyEntry) => parties.includes(party.letter);
  const getKey = (party: partyEntry) => party.name;
  const updateList = (party: partyEntry) => {
    if (isChecked(party)) {
      updateRoute(
        search,
        parties.filter((curr) => curr !== party.letter)
      );
    } else {
      updateRoute(search, [...parties, party.letter]);
    }
  };
  const getText = (party: partyEntry) => party.name;

  return (
    <FilterContainer>
      <FilterSearch updateSearch={updateSearch} search={search} />
      <Divider />
      <FilterList
        list={list}
        isChecked={isChecked}
        getKey={getKey}
        updateList={updateList}
        getText={getText}
      />
    </FilterContainer>
  );
};

export default FilterMembers;
