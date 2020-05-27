import React from 'react';

import Divider from '@material-ui/core/Divider';

import FilterContainer, { useFilter, FilterList, FilterSearch } from '../Filter';
import allParties from '../../utils/getParties';

type partyEntry = typeof allParties[number];

const FilterMembers: React.FC = () => {
  const {
    state: { parties, search },
    dispatch,
  } = useFilter();

  // Search functions
  const updateSearch = (value: string) => {
    dispatch({ type: 'SET_SEARCH', searchInput: value });
  };
  // List functions
  const list = [...allParties, { name: 'Partilösa', letter: '-' }];
  const isChecked = (party: partyEntry) => parties.includes(party.letter);
  const getKey = (party: partyEntry) => party.name;
  const updateList = (party: partyEntry) => {
    if (isChecked(party)) dispatch({ type: 'REMOVE_MEMBER_PARTY', party: party.letter });
    else dispatch({ type: 'SET_MEMBER_PARTY', party: party.letter });
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
