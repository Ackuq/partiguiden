import { DebateListResponse } from '../../types/debate';
import { debatesSerializer } from '../serializers/debates';
import { parliamentURL } from '../constants';
import { stringify } from 'querystring';

export const DEBATE_DOCUMENT_TYPES =
  'ip,bet,kam-ad,kam-al,kam-bd,kam-bu,kam-dv,kam-eu,kam-pd,kam-rd,kam-sd,kam-ud';

export const getDebates = (query: string): Promise<DebateListResponse> =>
  fetch(`${parliamentURL}/dokumentlista/?${query}`)
    .then((res) => res.json())
    .then(debatesSerializer);

export const debatesController = async (search?: string, org?: string, page?: string) => {
  const query = {
    doktyp: DEBATE_DOCUMENT_TYPES,
    webbtv: 1,
    sortorder: 'desc',
    utformat: 'json',
    sok: (search as string) || '',
    sort: 'datum',
    org: (org as string) || '',
    p: (page as string) || '',
  };

  return getDebates(stringify(query));
};
