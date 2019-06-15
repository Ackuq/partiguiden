const getMemberInformation = ({ url }) =>
  fetch(url)
    .then(res => res.json())
    .then(data => data.personlista.person);

export default getMemberInformation;
