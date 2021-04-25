export type VotingResult = {
  yes: Array<string>;
  no: Array<string>;
  winner: 'yes' | 'no' | 'draw';
};

export type VoteDescription = 'yes' | 'no' | 'refrain' | 'abscent';

export type VotingEntry = Record<VoteDescription, string>;

export type VotingDict = Record<string, VotingEntry>;

export interface VoteListEntry {
  title: string;
  results: VotingResult;
  authority: string;
  documentId: string;
  proposition: number;
  subtitle: string;
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
