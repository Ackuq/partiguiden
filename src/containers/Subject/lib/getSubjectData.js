import { getParties, fetchJSON, apiLinks } from '../../../utils';

const getPartyData = async (party, tags) =>
  new Promise(resolve => {
    const url = `${apiLinks.partiguidenApi}/party?party=${party}`;
    fetchJSON(url)
      .then(data => {
        const temp = [];
        Object.keys(data).forEach(id => {
          if (tags.indexOf(data[id].name) > -1) temp.push(data[id]);
        });
        resolve(temp);
      })
      .catch(err => {
        // eslint-disable-next-line no-console
        console.log(err.message);
        resolve([]);
      });
  });

const getSubjectData = async tags =>
  Promise.all(
    getParties.map(
      party =>
        new Promise(resolve =>
          getPartyData(party.name, tags).then(data => {
            if (data.length > 0) resolve({ name: party.name, data });
            resolve();
          })
        )
    )
  );

export default getSubjectData;
