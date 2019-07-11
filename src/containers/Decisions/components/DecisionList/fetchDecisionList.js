import { fetchJSON } from '../../../../utils';

const fetchDecisionList = ({ url, page }) =>
  fetchJSON(url).then(data => {
    const { dokumentlista } = data;

    const pages = parseInt(dokumentlista['@sidor'], 10);
    const lastPage = parseInt(page, 10) === pages || pages === 0;

    return {
      beslut: dokumentlista.dokument,
      lastPage,
    };
  });
export default fetchDecisionList;
