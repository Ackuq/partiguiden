import Cookies from 'universal-cookie';

import { getSubjectData } from './db';

const cookies = new Cookies();

const initialState = {
  cookieConsent: cookies.get('consent'),
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
