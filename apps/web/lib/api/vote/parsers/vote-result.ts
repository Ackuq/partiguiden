import type {
  NewVotingRow,
  OldVotingRow,
  DocumentStatus,
  DocumentProposalTable,
  OldVotingTable,
} from "@lib/api/parliament/types";
import type { VoteResultsResponse } from "../types";
import { getMaxVote } from "../utils/get-max-vote";
import extractVotes from "../utils/extract-votes";

function getVotingRow(
  votingTable: DocumentProposalTable,
): NewVotingRow[] | OldVotingRow {
  if ("tbody" in votingTable && votingTable.tbody !== undefined) {
    return votingTable.tbody.tr;
  }
  return (<OldVotingTable>votingTable).tr;
}

export default function parseVoteResult(
  data: DocumentStatus,
  num: number,
): VoteResultsResponse | undefined {
  const { dokumentstatus } = data;
  if (!dokumentstatus.dokutskottsforslag) {
    return;
  }
  const { utskottsforslag } = dokumentstatus.dokutskottsforslag;
  const voteObject = Array.isArray(utskottsforslag)
    ? utskottsforslag[num - 1]
    : utskottsforslag;

  if (!voteObject || !voteObject.votering_sammanfattning_html) {
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
