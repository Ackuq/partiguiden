import firebase from '../db';

const getSubjectData = () =>
  firebase
    .firestore()
    .collection('Data')
    .doc('Pages')
    .get()
    .then(doc => doc.data());

// eslint-disable-next-line import/prefer-default-export
export { getSubjectData };
