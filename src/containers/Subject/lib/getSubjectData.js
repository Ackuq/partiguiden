import fetch from 'isomorphic-unfetch';

import { getParties, apiLinks } from '../../../utils';

const getSubjectData = tags =>
  Promise.all(
    getParties.map(async party => {
      const url = `${apiLinks.partiguidenApi}/party/${party.letter}`;
      const res = await fetch(url);
      const data = await res.json();
      const temp = [];

      Object.keys(data).forEach(id => {
        if (tags.indexOf(data[id].name) > -1) temp.push(data[id]);
      });
      if (temp.length > 0) return { name: party.name, data: temp };
      return null;
    })
  );

export default getSubjectData;
