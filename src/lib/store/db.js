import fetch from 'isomorphic-unfetch';

const getSubjectData = () =>
  fetch('https://api.partiguiden.nu/subject')
    .then(res => res.json())
    .then(data => data)
    .catch(err => {
      // eslint-disable-next-line no-console
      console.log(err.message);
      return [];
    });

// eslint-disable-next-line import/prefer-default-export
export { getSubjectData };
