interface resultInterface {
  ja: Array<string>;
  nej: Array<string>;
  total: 0 | 1;
}

export default votes => {
  const result: resultInterface = { ja: [], nej: [], total: 0 };
  let yes = 0;
  let no = 0;

  Object.keys(votes).forEach(key => {
    if (key === '-' || key === 'Totalt') return;
    yes += parseInt(votes[key].ja, 10);
    no += parseInt(votes[key].nej, 10);
    const vote = Object.keys(votes[key]).reduce((a, b) =>
      parseInt(votes[key][a], 10) > parseInt(votes[key][b], 10) ? a : b
    );

    if (vote === 'ja' || vote === 'nej') result[vote].push(key);
  });

  result.total = yes > no ? 1 : 0;
  return result;
};
