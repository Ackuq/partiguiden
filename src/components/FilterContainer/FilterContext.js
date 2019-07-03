import React, { createContext, useReducer, useContext } from 'react';
import { func, oneOfType, object, node } from 'prop-types';

const FilterContext = createContext();

const FilterProvider = ({ reducer, initialState, children }) => (
  <FilterContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </FilterContext.Provider>
);

FilterProvider.propTypes = {
  reducer: func.isRequired,
  children: oneOfType([node, func]).isRequired,
  initialState: object.isRequired
};

const useFilter = () => useContext(FilterContext);

export { FilterContext, FilterProvider, useFilter };
