import { getSubjectData } from './db';

const initialState = {
  subjectData: getSubjectData(),
  filter: {
    search: '',
    org: []
  },
  memberFilter: {
    party: ''
  }
};

export default initialState;
