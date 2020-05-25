import { votingDict, votingResult, voteDesc } from '../../types/voting.d';

export default (partyVotes: votingDict) => {
  const result: votingResult = { ja: [], nej: [], total: 0 };
  let yes = 0;
  let no = 0;

  const parties = Object.keys(partyVotes).filter((party) => party !== '-' && party !== 'Totalt');

  parties.forEach((party) => {
    yes += parseInt(partyVotes[party].ja, 10);
    no += parseInt(partyVotes[party].nej, 10);

    const decisions = Object.keys(partyVotes[party]).filter(
      (decision) => decision !== 'franvarande'
    ) as voteDesc[];

    const vote = decisions.reduce((a, b) =>
      parseInt(partyVotes[party][a], 10) > parseInt(partyVotes[party][b], 10) ? a : b
    );

    if (vote === 'ja' || vote === 'nej') result[vote].push(party);
  });

  result.total = yes > no ? 1 : 0;
  return result;
};
