import React from 'react';

import FilterCategories from './components/FilterCategories';
import FilterSearch from './components/FilterSearch';
import FilterContainer from '../FilterContainer';

const FilterScreen = () => (
  <FilterContainer>
    <FilterSearch />
    <FilterCategories />
  </FilterContainer>
);

export default FilterScreen;
