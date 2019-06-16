const reducer = (state, action) => {
  switch (action.type) {
    case 'ACCEPT_COOKIES': {
      return { ...state, cookieConsent: true };
    }

    case 'RESET_FILTER':
      return { ...state, filter: { org: [], rm: '', num: '', bet: '', search: '' } };

    case 'SET_ORG':
      return { ...state, filter: { ...state.filter, org: [action.org] } };

    case 'SET_SEARCH':
      return { ...state, filter: { ...state.filter, search: action.searchInput } };

    case 'REMOVE_ORG_FROM_FILTER':
      state.filter.org.splice(state.filter.org.indexOf(action.org), 1);
      return { ...state, filter: { ...state.filter, org: state.filter.org } };

    case 'ADD_ORG_TO_FILTER':
      return { ...state, filter: { ...state.filter, org: state.filter.org.concat(action.org) } };

    default:
      return state;
  }
};

export default reducer;
