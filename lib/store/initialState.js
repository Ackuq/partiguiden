import { getSubjectData } from './db';
import { table } from '../authorityTable';

const initialState = {
  subjectData: getSubjectData(),
  filter: {
    org: table.map(org => org.code)
  }
};

export default initialState;
