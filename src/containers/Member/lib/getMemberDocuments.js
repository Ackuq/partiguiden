const getMemberDocuments = ({ url }) =>
  fetch(url)
    .then(res => res.json())
    .then(data => ({
      count: data.dokumentlista['@traffar'],
      documents: data.dokumentlista.dokument
    }));

export default getMemberDocuments;
