import fetch from 'isomorphic-unfetch';

const fetchVoteList = ({ page, url }) =>
  fetch(url)
    .then(res => res.json())
    .then(data => {
      const { dokumentlista } = data;
      const pages = parseInt(dokumentlista['@sidor'], 10);

      return {
        lastPage: parseInt(page, 10) === pages || pages === 0,
        voteringar: dokumentlista.dokument,
      };
    });

export default fetchVoteList;
