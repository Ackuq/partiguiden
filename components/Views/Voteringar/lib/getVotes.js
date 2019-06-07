export default row => {
  const voting = {};
  for (let i = 2; i < row.length - 1; i += 1) {
    const { td } = row[i];
    const partyVotes = {
      ja: td[1]._,
      nej: td[2]._,
      avstaende: td[3]._,
      franvarande: td[4]._
    };
    voting[td[0]._] = partyVotes;
  }
  return voting;
};
