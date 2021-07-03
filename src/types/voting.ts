export type VotingResult = {
  yes: Array<string>;
  no: Array<string>;
  winner: 'yes' | 'no' | 'draw';
};

export type VoteDescription = 'yes' | 'no' | 'refrain' | 'abscent';

export type VotingEntry = Record<VoteDescription, string>;

export type VotingDict = Record<string, VotingEntry>;

export interface VoteResultsResponse {
  results: VotingResult;
  subtitle: string;
}
export interface VoteListEntry extends VoteResultsResponse {
  title: string;
  authority: string;
  documentId: string;
  proposition: number;
}

export interface ProcessedDocument {
  id: string;
  label: string;
  proposals?: string;
}

export interface VoteAppendixItem {
  titel: string;
  dok_id: string;
  fil_url: string;
}

export interface VoteList {
  pages: number;
  votes: Array<VoteListEntry>;
}

export interface Vote {
  title: string;
  description: string;
  authority: string;
  propositionText: string;
  processedDocuments: Array<ProcessedDocument>;
  appendix: Array<VoteAppendixItem>;
  decision: string;
  voting: Record<string, Record<VoteDescription, string>>;
}

/* API Types */

export type VotingRowEntry = { td: Array<string> };

export type VotingRow = [
  {
    th: Array<string>;
  },
  {
    td: { h4: string; p: string };
  },
  ...VotingRowEntry[]
];
