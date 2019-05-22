import { getSubjectData } from './db';

const initialState = {
  subjectData: getSubjectData(),
  filter: {
    search: '',
    org: [],
    rm: '',
    num: '',
    bet: ''
  }
};

export default initialState;
