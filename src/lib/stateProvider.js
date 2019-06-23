import React, { createContext, useContext, useReducer } from 'react';
import { func, node, oneOfType, object } from 'prop-types';

const StateContext = createContext();

const StateProvider = ({ reducer, initialState, children }) => (
  <StateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StateContext.Provider>
);

StateProvider.propTypes = {
  reducer: func.isRequired,
  children: oneOfType([node, func]).isRequired,
  initialState: object.isRequired
};

const useStateValue = () => useContext(StateContext);

export { StateContext, StateProvider, useStateValue };
