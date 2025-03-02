import { parties } from "@partiguiden/party-data/types";

import type { VoteDescription, VotingDict, VotingResult } from "../types";

const decisions: VoteDescription[] = ["yes", "no", "refrain"];

export const getMaxVote = (votes: VotingDict): VotingResult => {
  const result: VotingResult = { yes: [], no: [], winner: "draw" };

  // Want to isolate so just the parties are in the parties constant

  const yesTotal = votes.total.yes;
  const noTotal = votes.total.no;

  /* Get the winner */
  if (yesTotal !== noTotal) {
    result.winner = yesTotal > noTotal ? "yes" : "no";
  }

  /* Decide on what parties voted for */
  for (const party of Object.values(parties)) {
    if (!(party in votes)) {
      continue;
    }

    const partyVotes = votes[party];
    const decision = decisions.reduce((a, b) =>
      partyVotes[a] > partyVotes[b] ? a : b,
    );

    if (decision === "yes" || decision === "no") {
      result[decision].push(party);
    }
  }

  return result;
};
