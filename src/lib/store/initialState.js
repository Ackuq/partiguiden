import { getSubjectData } from './db';

const initialState = {
  subjectData: getSubjectData(),
  filter: {
    search: '',
    org: []
  }
};

export default initialState;
