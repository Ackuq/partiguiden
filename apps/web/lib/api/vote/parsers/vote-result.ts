import type {
  NewVotingRow,
  NewVotingTable,
  OldVotingRow,
  OldVotingTable,
  VoteDocumentStatus,
  VotingTable,
} from "@lib/api/parliament/types";
import type { VoteResultsResponse } from "../types";
import { getMaxVote } from "../utilts/get-max-vote";
import extractVotes from "../utilts/extract-votes";

function getVotingRow(votingTable: VotingTable): NewVotingRow[] | OldVotingRow {
  if ((<NewVotingTable>votingTable).tbody !== undefined) {
    return (<NewVotingTable>votingTable).tbody.tr;
  }
  return (<OldVotingTable>votingTable).tr;
}

export default function parseVoteResult(
  data: VoteDocumentStatus,
  num: number,
): VoteResultsResponse {
  const { dokumentstatus } = data;
  const { utskottsforslag } = dokumentstatus.dokutskottsforslag;
  const voteObject = Array.isArray(utskottsforslag)
    ? utskottsforslag[num - 1]
    : utskottsforslag;

  const { table } = voteObject.votering_sammanfattning_html;
  const singleTable = Array.isArray(table) ? table[table.length - 1] : table;
  const tableRow = getVotingRow(singleTable);

  return {
    results: getMaxVote(extractVotes(tableRow)),
    subtitle: voteObject.rubrik,
  };
}
