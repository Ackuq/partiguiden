export type votingResult = {
  ja: Array<string>;
  nej: Array<string>;
  total: 0 | 1;
};

export type voteDesc = 'ja' | 'nej' | 'avstaende' | 'franvarande';

export type votingEntry = Record<voteDesc, string>;

export type votingDict = Record<string, votingEntry>;

type votingRowHeader = {
  th: Array<string>;
};

type votingRowDesc = {
  td: { h4: string; p: string };
};

type votingRowEntry = { td: Array<string> };

export interface VotingRow extends Array<T> {
  [0]: votingRowDesc;
  [1]: votingRowHeader;
  [i: number]: votingRowEntry;
}
export interface VoteListEntry {
  id: string;
  beteckning: string;
  tempbeteckning: number;
  titel: string;
  organ: string;
}
