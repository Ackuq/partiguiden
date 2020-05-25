import fetch from 'isomorphic-unfetch';

export default (url: string) =>
  fetch(url)
    .then((res) => res.json())
    .then((data) => data);
