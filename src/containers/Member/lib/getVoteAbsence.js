const getVoteAbsence = ({ url }) =>
  fetch(url)
    .then(res => res.json())
    .then(json => {
      const data = json.voteringlista.votering;
      const total =
        parseInt(data.Ja, 10) +
        parseInt(data.Nej, 10) +
        parseInt(data.Frånvarande, 10) +
        parseInt(data.Avstår, 10);
      return { absence: Math.round((1 - parseInt(data.Frånvarande, 10) / total) * 1000) / 10 };
    });

export default getVoteAbsence;
