import React from 'react';

import { Divider } from '@material-ui/core';

import FilterContainer, { FilterList, FilterSearch } from '../Filter';

import allParties from '../../utils/getParties';
import { PartyAbbreviation } from '../../utils/parties';

type PartyEntry = typeof allParties[number];

interface FilterState {
  search: string;
  parties: Array<PartyAbbreviation>;
}

interface Props {
  state: FilterState;
  setState: React.Dispatch<React.SetStateAction<FilterState>>;
}

const FilterMembers: React.FC<Props> = ({ state, setState }) => {
  // Search functions
  const updateSearch = (value: string) => {
    setState((prevState) => ({ ...prevState, search: value }));
  };
  // List functions
  const list = [...allParties, { name: 'Partilösa', letter: '-' }];
  const isChecked = (party: PartyEntry) => state.parties.includes(party.letter);
  const getKey = (party: PartyEntry) => party.name;
  const updateList = (party: PartyEntry) => {
    if (isChecked(party)) {
      setState((prevState) => ({
        ...prevState,
        parties: prevState.parties.filter((curr) => curr !== party.letter),
      }));
    } else {
      setState((prevState) => ({ ...prevState, parties: [...prevState.parties, party.letter] }));
    }
  };
  const getText = (party: PartyEntry) => party.name;

  return (
    <FilterContainer>
      <FilterSearch updateSearch={updateSearch} search={state.search} />
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
