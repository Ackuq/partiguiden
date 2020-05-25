import { Reducer } from 'react';

export enum ActionTypes {
  SET_ORG = 'SET_ORG',
  SET_SEARCH = 'SET_SEARCH',
  REMOVE_ORG_FROM_FILTER = 'REMOVE_ORG_FROM_FILTER',
  ADD_ORG_TO_FILTER = 'ADD_ORG_TO_FILTER',
}

type Action =
  | { type: ActionTypes.SET_ORG; org: string }
  | { type: ActionTypes.SET_SEARCH; searchInput: string }
  | { type: ActionTypes.REMOVE_ORG_FROM_FILTER; org: string }
  | { type: ActionTypes.ADD_ORG_TO_FILTER; org: string };

interface State {
  org: Array<string>;
  sok: string;
}

const reducer: Reducer<State, Action> = (state, action) => {
  switch (action.type) {
    case ActionTypes.SET_ORG:
      return { ...state, org: [action.org] };

    case ActionTypes.SET_SEARCH:
      return { ...state, search: action.searchInput };

    case ActionTypes.REMOVE_ORG_FROM_FILTER:
      return { ...state, org: state.org.filter((el) => el !== action.org) };

    case ActionTypes.ADD_ORG_TO_FILTER:
      return { ...state, org: [...state.org, action.org] };

    default:
      return state;
  }
};

export default reducer;
