import React from 'react';

import FilterContainer, {
  useFilter,
  FilterList,
  FilterSearch,
} from '../../../../components/Filter';
import getParties from '../../../../utils/getParties';

const FilterMembers = () => {
  const [{ parties, search }, dispatch] = useFilter();

  // Search functions
  const updateSearch = value => {
    dispatch({ type: 'SET_SEARCH', searchInput: value });
  };
  // List functions
  const list = [...getParties, { name: 'Partilösa', letter: '-' }];
  const isChecked = party => parties.includes(party.letter);
  const getKey = party => party.name;
  const updateList = party => {
    if (isChecked(party)) dispatch({ type: 'REMOVE_MEMBER_PARTY', party: party.letter });
    else dispatch({ type: 'SET_MEMBER_PARTY', party: party.letter });
  };
  const getText = party => party.name;

  return (
    <FilterContainer>
      <FilterSearch updateSearch={updateSearch} search={search} />
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
