export default votes => {
  let result = { ja: [], nej: [] },
    yes = 0,
    no = 0;

  for (let key in votes) {
    if (key == "-" || key == "Totalt") continue;
    yes += parseInt(votes[key]["ja"]);
    no += parseInt(votes[key]["nej"]);
    const vote = Object.keys(votes[key]).reduce((a, b) =>
      parseInt(votes[key][a]) > parseInt(votes[key][b]) ? a : b
    );

    if (vote == "ja" || vote == "nej") result[vote].push(key);
  }

  result.total = yes > no ? 1 : 0;
  return result;
};
