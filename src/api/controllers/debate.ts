import { DEBATE_DOCUMENT_TYPES } from './debates';
import { debateSerializer } from '../serializers/debate';
import { parliamentURL } from '../constants';
import { stringify } from 'querystring';

export const getDebates = (query: string) =>
  fetch(`${parliamentURL}/dokumentlista/?${query}`)
    .then((res) => res.json())
    .then(debateSerializer);

export const debatesController = async (id: string) => {
  const query = {
    doktyp: DEBATE_DOCUMENT_TYPES,
    webbtv: 1,
    utformat: 'json',
    sok: id,
    sort: 'datum',
  };
  return getDebates(stringify(query));
};
