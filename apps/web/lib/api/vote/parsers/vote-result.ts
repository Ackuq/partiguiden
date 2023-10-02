import type {
  NewVotingRow,
  NewVotingTable,
  OldVotingRow,
  OldVotingTable,
  VoteDocumentStatus,
  VotingTable,
} from "@lib/api/parliament/types";
import type { VoteResultsResponse } from "../types";
import { getMaxVote } from "../utils/get-max-vote";
import extractVotes from "../utils/extract-votes";

function getVotingRow(votingTable: VotingTable): NewVotingRow[] | OldVotingRow {
  if ((<NewVotingTable>votingTable).tbody !== undefined) {
    return (<NewVotingTable>votingTable).tbody.tr;
  }
  return (<OldVotingTable>votingTable).tr;
}

export default function parseVoteResult(
  data: VoteDocumentStatus,
  num: number,
): VoteResultsResponse | undefined {
  const { dokumentstatus } = data;
  const { utskottsforslag } = dokumentstatus.dokutskottsforslag;
  const voteObject = Array.isArray(utskottsforslag)
    ? utskottsforslag[num - 1]
    : utskottsforslag;

  if (!voteObject) {
    return undefined;
  }

  const { table } = voteObject.votering_sammanfattning_html;
  const singleTable = Array.isArray(table) ? table[table.length - 1] : table;

  if (!singleTable) {
    return undefined;
  }

  const tableRow = getVotingRow(singleTable);

  return {
    allVotes: extractVotes(tableRow),
    results: getMaxVote(extractVotes(tableRow)),
    subtitle: voteObject.rubrik,
  };
}
