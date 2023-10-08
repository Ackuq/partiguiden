import type { Party } from "@partiguiden/party-data/types";
import type { DocumentAppendix } from "../parliament/types";
import type { Committee } from "@lib/committes";

export type VoteDescription = "yes" | "no" | "refrain" | "absent";

export type VotingEntry = Record<VoteDescription, number>;

export type VotingGroup = Party | "noParty" | "total";

export type VotingDict = Record<VotingGroup, VotingEntry>;

export type VotingResult = {
  yes: Party[];
  no: Party[];
  winner: "yes" | "no" | "draw";
};

export interface VoteResultsResponse {
  allVotes: VotingDict;
  results: VotingResult;
  subtitle: string;
}
export interface VoteListEntry extends VoteResultsResponse {
  title: string;
  committee?: Committee;
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
  votes: VoteListEntry[];
}

export interface Vote {
  title: string;
  description: string;
  committee?: Committee;
  propositionText: string;
  processedDocuments: ProcessedDocument[];
  appendix: DocumentAppendix[];
  decision: string;
  voting: VotingDict;
}
