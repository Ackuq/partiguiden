import fetch from 'isomorphic-unfetch';

interface Props {
  page: string;
  url: string;
}

const fetchVoteList = ({ page, url }: Props) =>
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      const { dokumentlista } = data;
      const pages = parseInt(dokumentlista['@sidor'], 10);

      return {
        lastPage: parseInt(page, 10) === pages || pages === 0,
        voteringar: dokumentlista.dokument,
      };
    });

export default fetchVoteList;
