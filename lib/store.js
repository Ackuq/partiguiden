import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { table } from "./authorityTable";
const initialState = {
  filter: table
};

export const actionTypes = {
  UPDATEFILTER: "UPDATEFILTER"
};

// REDUCERS
export const reducer = (state = exampleInitialState, action) => {
  switch (action.type) {
    case actionTypes.RESET:
      return Object.assign({}, state, {
        filter: state.filter
      });
    default:
      return state;
  }
};

// ACTIONS
export const updateFilter = () => {
  return { type: actionTypes.UPDATEFILTER };
};

export function initializeStore() {
  return createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware())
  );
}
