import { getSubjectData } from './db';

const initialState = {
  subjectData: getSubjectData(),
  filter: {
    search: '',
    org: []
  },
  memberFilter: {
    parties: []
  }
};

export default initialState;
