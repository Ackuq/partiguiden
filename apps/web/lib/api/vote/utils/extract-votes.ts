import type { NewVotingRow, OldVotingRow } from "@lib/api/parliament/types";
import type { Party } from "@partiguiden/party-data/types";
import { parties } from "@partiguiden/party-data/types";

import type { VotingDict, VotingEntry, VotingGroup } from "../types";

function votingGroupRemap(partyName: string): VotingGroup {
  switch (partyName) {
    case "fp":
      return parties.L;
    case "-":
      return "noParty";
    case "Totalt":
      return "total";
    default:
      return partyName.toUpperCase() as Party;
  }
}

const votingGroup = [...Object.values(parties), "noParty", "total"] as const;

const defaultVotingEntry: VotingEntry = {
  yes: 0,
  no: 0,
  absent: 0,
  refrain: 0,
} as const;

const defaultVotes: VotingDict = votingGroup.reduce(
  (prev, curr) => ({ ...prev, [curr]: defaultVotingEntry }),
  {} as VotingDict,
);

function extractVotesNew(row: NewVotingRow[]): VotingDict {
  const voting = {} as VotingDict;

  const total: VotingEntry = {
    yes: 0,
    no: 0,
    absent: 0,
    refrain: 0,
  };

  row.forEach(({ th, td }) => {
    const votingGroupName = votingGroupRemap(th);
    const partyVotes = {
      yes: +td[0],
      no: +td[1],
      refrain: +td[2],
      absent: +td[3],
    };
    total.yes = total.yes + partyVotes.yes;
    total.no = total.no + partyVotes.no;
    total.refrain = total.refrain + partyVotes.refrain;
    total.absent = total.absent + partyVotes.absent;
    voting[votingGroupName] = partyVotes;
  });
  voting.total = total;
  return voting;
}

export default function extractVotes(
  row: NewVotingRow[] | OldVotingRow | undefined,
): VotingDict {
  if (!row) {
    return defaultVotes;
  }
  // New only contains `td`
  if (row.every((col) => Object.hasOwn(col, "td"))) {
    return extractVotesNew(row as NewVotingRow[]);
  }
  const voting = {} as VotingDict;
  const [, , ...entries] = row as OldVotingRow;

  entries.forEach((entry) => {
    const { td } = entry;

    if (Array.isArray(td)) {
      const votingGroupName = votingGroupRemap(td[0]);

      const partyVotes = {
        yes: +td[1],
        no: +td[2],
        refrain: +td[3],
        absent: +td[4],
      };
      voting[votingGroupName] = partyVotes;
    }
  });

  return voting;
}
