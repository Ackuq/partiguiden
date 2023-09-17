import { VoteList } from '../../types/voting';
import { parliamentURL } from '../constants';
import { stringify } from 'querystring';
import { votesSerializer } from '../serializers/votes';

export const getVotes = (query: string): Promise<VoteList> =>
  fetch(`${parliamentURL}/dokumentlista/?${query}`)
    .then((res) => res.json())
    .then(votesSerializer);

export const votesController = (
  search?: string,
  org?: string,
  page?: string
): Promise<VoteList> => {
  const query = {
    doktyp: 'votering',
    sortorder: 'desc',
    utformat: 'json',
    sok: (search as string) || '',
    sort: search ? 'rel' : 'datum',
    org: (org as string) || '',
    p: (page as string) || '',
  };

  return getVotes(stringify(query));
};
