const reducer = (state, action) => {
  switch (action.type) {
    case 'REMOVE_MEMBER_PARTY':
      return {
        ...state,
        parties: state.parties.filter(el => el !== action.party),
      };

    case 'SET_MEMBER_PARTY':
      return {
        ...state,
        parties: [...state.parties, action.party],
      };

    case 'SET_SEARCH':
      return { ...state, search: action.searchInput };

    default:
      return state;
  }
};

export default reducer;
