import React, { createContext, useReducer, useContext } from 'react';

interface FilterApi {
  state: any;
  dispatch: React.Dispatch<any>;
}

const FilterContext = createContext({} as FilterApi);

interface Props {
  reducer: (state: any, action: any) => any;
  children: React.ReactChild;
  initialState: any;
}

const FilterProvider: React.FC<Props> = ({ reducer, initialState, children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const value = { state, dispatch };

  return <FilterContext.Provider value={value}>{children}</FilterContext.Provider>;
};

const useFilter = () => useContext(FilterContext);

export { FilterContext, FilterProvider, useFilter };
