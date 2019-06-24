import fetch from 'isomorphic-unfetch';

import { getParties, apiLinks } from '../../../utils';

const getPartyData = async (party, tags) =>
  new Promise(async resolve => {
    const url = `${apiLinks.partiguidenApi}/party?party=${party}`;
    const res = await fetch(url);
    const data = await res.json();

    const temp = [];
    Object.keys(data).forEach(id => {
      if (tags.indexOf(data[id].name) > -1) temp.push(data[id]);
    });
    if (temp.length > 0) resolve({ name: party, data: temp });
    else resolve();
  });

const getSubjectData = tags => Promise.all(getParties.map(party => getPartyData(party.name, tags)));

export default getSubjectData;
