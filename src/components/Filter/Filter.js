import React from 'react';
import { Divider } from '@material-ui/core';

import FilterCategories from './components/FilterCategories';
import FilterSearch from './components/FilterSearch';
import FilterContainer from '../FilterContainer';

const FilterScreen = () => (
  <FilterContainer>
    <FilterSearch />
    <Divider />
    <FilterCategories />
  </FilterContainer>
);

export default FilterScreen;
