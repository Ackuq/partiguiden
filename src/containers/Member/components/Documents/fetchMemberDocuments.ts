import fetchJSON from '../../../../utils/fetchJSON';

interface Props {
  url: string;
  page: number;
}

const fetchMemberDocuments = ({ url, page }: Props) =>
  fetchJSON(url).then((data) => {
    const { dokumentlista } = data;
    const pages = parseInt(dokumentlista['@sidor'], 10);
    return {
      count: dokumentlista['@traffar'],
      documents: dokumentlista.dokument,
      lastPage: page === pages || pages === 0,
    };
  });

export default fetchMemberDocuments;
