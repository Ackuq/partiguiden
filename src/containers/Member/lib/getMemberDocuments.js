import fetchJSON from '../../../utils/fetchJSON';

const getMemberDocuments = ({ url, page }) =>
  fetchJSON(url).then(data => {
    const { dokumentlista } = data;
    const pages = parseInt(dokumentlista['@sidor'], 10);
    return {
      count: dokumentlista['@traffar'],
      documents: dokumentlista.dokument,
      lastPage: parseInt(page, 10) === pages || pages === 0
    };
  });

export default getMemberDocuments;
