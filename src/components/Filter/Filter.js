import React, { useState } from 'react';

import { FilterCategories, FilterCategoriesButtons } from './components/FilterCategories';
import FilterSearch from './components/FilterSearch';
import FilterContainer from '../FilterContainer';

const FilterScreen = () => {
  const [loadAll, setLoadAll] = useState(false);

  return (
    <FilterContainer>
      <FilterSearch />
      <FilterCategories loadAll={loadAll} />
      <FilterCategoriesButtons loadAll={loadAll} setLoadAll={setLoadAll} />
    </FilterContainer>
  );
};

export default FilterScreen;
