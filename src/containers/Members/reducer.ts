import { Reducer } from 'react';

export enum ActionTypes {
  REMOVE_MEMBER_PARTY = 'REMOVE_MEMBER_PARTY',
  SET_MEMBER_PARTY = 'SET_MEMBER_PARTY',
  SET_SEARCH = 'SET_SEARCH',
}

type Action =
  | { type: ActionTypes.REMOVE_MEMBER_PARTY | ActionTypes.SET_MEMBER_PARTY; party: string }
  | { type: ActionTypes.SET_SEARCH; searchInput: string };

interface State {
  parties: Array<string>;
  sok: string;
}

const reducer: Reducer<State, Action> = (state, action) => {
  switch (action.type) {
    case ActionTypes.REMOVE_MEMBER_PARTY:
      return {
        ...state,
        parties: state.parties.filter((el) => el !== action.party),
      };

    case ActionTypes.SET_MEMBER_PARTY:
      return {
        ...state,
        parties: [...state.parties, action.party],
      };

    case ActionTypes.SET_SEARCH:
      return { ...state, search: action.searchInput };

    default:
      return state;
  }
};

export default reducer;
