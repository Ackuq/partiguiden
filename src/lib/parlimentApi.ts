import fetch from 'isomorphic-unfetch';
import stripJsonComments from 'strip-json-comments';
import { checkVote } from '../utils/votes/parseVoteInfo';

export const baseUrl = 'https://data.riksdagen.se';

export const checkIfVotesExist = (url: string) =>
  fetch(url)
    .then((res) => res.text())
    .then((json) => {
      const result = JSON.parse(stripJsonComments(json));
      const { dokumentstatus } = result;

      if (dokumentstatus.dokutskottsforslag) {
        return { votesExist: checkVote(dokumentstatus.dokutskottsforslag.utskottsforslag) };
      }
      return { votesExist: false };
    });

export const getDecisionList = (search: string, org: string[], page: number) =>
  fetch(
    `${baseUrl}/dokumentlista/?sok=${search}&doktyp=bet&org=${org.join(
      '&org='
    )}&dokstat=beslutade&sort=${search ? 'rel' : 'datum'}&sortorder=desc&utformat=json&p=${page}`
  )
    .then((res) => res.json())
    .then((data) => {
      const { dokumentlista } = data;

      const pages = parseInt(dokumentlista['@sidor'], 10);
      const lastPage = page === pages || pages === 0;

      return {
        beslut: dokumentlista.dokument,
        lastPage,
      };
    });

export const getVoteList = (search: string, org: string[], page: number) =>
  fetch(
    `${baseUrl}/dokumentlista/?sok=${search}&doktyp=votering&org=${org.join('&org=')}&sort=${
      search ? 'rel' : 'datum'
    }&sortorder=desc&utformat=json&a=s&p=${page}`
  )
    .then((res) => res.json())
    .then((data) => {
      const { dokumentlista } = data;
      const pages = parseInt(dokumentlista['@sidor'], 10);

      return {
        lastPage: page === pages || pages === 0,
        voteringar: dokumentlista.dokument,
      };
    });

export const getVote = (id: string | number) =>
  fetch(`${baseUrl}/dokumentstatus/${id}.json`).then((res) => res.text());

export const getMemberDocuments = (id: number, page: number) =>
  fetch(
    `${baseUrl}/dokumentlista/?avd=dokument&sort=datum&sortorder=datum&utformat=json&iid=${id}&p=${page}`
  ).then((res) => res.json());

export const getDocument = (id: string) =>
  fetch(`${baseUrl}/dokument/${id}`).then((res) => res.text());
