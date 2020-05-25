import { fetchJSON } from '../../../utils';

interface Props {
  url: string;
  page: string;
}

const fetchDecisionList = ({ url, page }: Props) =>
  fetchJSON(url).then((data) => {
    const { dokumentlista } = data;

    const pages = parseInt(dokumentlista['@sidor'], 10);
    const lastPage = parseInt(page, 10) === pages || pages === 0;

    return {
      beslut: dokumentlista.dokument,
      lastPage,
    };
  });
export default fetchDecisionList;
