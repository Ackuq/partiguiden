const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_ORG':
      return { ...state, org: [action.org] };

    case 'SET_SEARCH':
      return { ...state, search: action.searchInput };

    case 'REMOVE_ORG_FROM_FILTER':
      return { ...state, org: state.org.filter(el => el !== action.org) };

    case 'ADD_ORG_TO_FILTER':
      return { ...state, org: [...state.org, action.org] };

    default:
      return state;
  }
};

export default reducer;
