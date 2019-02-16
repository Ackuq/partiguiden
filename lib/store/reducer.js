const reducer = (state, action) => {
  switch (action.type) {
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
