import fetch from 'isomorphic-unfetch';
import { apiLinks } from '../../utils';

const getSubjectData = () =>
  fetch(`${apiLinks.partiguidenApi}/subject`)
    .then(res => res.json())
    .then(data => data)
    .catch(err => {
      // eslint-disable-next-line no-console
      console.log(err.message);
      return [];
    });

// eslint-disable-next-line import/prefer-default-export
export { getSubjectData };
