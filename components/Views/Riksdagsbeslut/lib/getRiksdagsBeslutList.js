import fetch from 'isomorphic-unfetch';

const getRiksdagsBeslutList = ({ url, page }) =>
  fetch(url)
    .then(res => res.json())
    .then(data => {
      const { dokumentlista } = data;

      const pages = parseInt(dokumentlista['@sidor'], 10);

      return {
        beslut: dokumentlista.dokument,
        lastPage: parseInt(page, 10) === pages || pages === 0
      };
    });
export default getRiksdagsBeslutList;
