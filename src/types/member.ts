import { PartyAbbreviation } from './party';

export interface MemberDocument {
  authority: string | null;
  title: string;
  subtitle: string;
  altTitle: string;
  id: string;
}

export interface MemberDocuments {
  pages: number;
  count: number;
  documents: Array<MemberDocument>;
}

export interface Information {
  code: string;
  content: Array<string>;
  type: string;
}

export interface Task {
  authorityCode: string;
  role: string;
  content: Array<string>;
  status: string | null;
  type: string;
  from: string;
  to: string;
}

export interface Member {
  id: string;
  sourceId: string;
  firstName: string;
  lastName: string;
  pictureUrl: string;
  age: number;
  party: PartyAbbreviation;
  district: string;
  status: string;
  information: Information[];
  tasks: Task[];
  isLeader: boolean;
  absence: number | null;
}
