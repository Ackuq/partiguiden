import firebase from '../../../lib/db';

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
    firebase
      .firestore()
      .collection('Parties')
      .doc(party)
      .onSnapshot({ includeMetadataChanges: true }, snapshot => {
        const temp = [];
        Object.keys(snapshot.data()).forEach(map => {
          if (tags.indexOf(snapshot.data()[map].name) !== -1) {
            temp.push(snapshot.data()[map]);
          }
        });
        resolve(temp);
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
