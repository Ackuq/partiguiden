import fetch from 'isomorphic-unfetch';

const getSubjectData = () =>
  fetch('https://partiguiden-c31f9.appspot.com/subject')
    .then(res => res.json())
    .then(data => data);

// eslint-disable-next-line import/prefer-default-export
export { getSubjectData };
