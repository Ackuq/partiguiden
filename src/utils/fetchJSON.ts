import fetch from 'isomorphic-unfetch';

export default url =>
  fetch(url)
    .then(res => res.json())
    .then(data => data);
