import fetch from 'isomorphic-unfetch';

const getIndex = [
  'Socialdemokraterna',
  'Moderaterna',
  'Sverigedemokraterna',
  'Centerpartiet',
  'Vänsterpartiet',
  'Kristdemokraterna',
  'Miljöpartiet'
];

const getPartyDataFromDB = async (party, tags) =>
  new Promise(resolve => {
    const url = `https://api.partiguiden.nu/party?party=${party}`;
    fetch(url)
      .then(res => res.json())
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

const getData = async tags =>
  Promise.all(
    getIndex.map(
      party =>
        new Promise(resolve =>
          getPartyDataFromDB(party, tags).then(data => {
            if (data.length > 0) resolve({ name: party, data });
            resolve();
          })
        )
    )
  );

// eslint-disable-next-line import/prefer-default-export
export { getData };
