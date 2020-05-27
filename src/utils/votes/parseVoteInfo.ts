import { votingDict, votingResult, voteDesc, VotingRow, votingEntry } from '../../types/voting.d';

export const checkVote = (list: Array<any> | any) => {
  if (!Array.isArray(list) && list.votering_id !== null) return true;

  for (let i = 0; i < list.length; i += 1) {
    if (list[i].votering_id !== null) return true;
  }
  return false;
};

export const getMaxVote = (partyVotes: votingDict) => {
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

export const extractVotes = (row: VotingRow) => {
  const voting: Record<string, votingEntry> = {};

  for (let i = 2; i < row.length - 1; i += 1) {
    const { td } = row[i];
    const partyVotes = {
      ja: td[1],
      nej: td[2],
      avstaende: td[3],
      franvarande: td[4],
    };
    voting[td[0]] = partyVotes;
  }
  return voting;
};
