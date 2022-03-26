import { PartyAbbreviation } from '../utils/parties';

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

export interface MemberResponse {
  id: string;
  sourceId: string;
  firstName: string;
  lastName: string;
  pictureUrl: string;
  pictureUrlLowRes: string;
  age: number;
  party: PartyAbbreviation | '-';
  district: string;
  status: string;
  information: Information[];
  tasks: Task[];
  isLeader: boolean;
}

export type Member = MemberResponse & {
  absence: number | null;
};

export type MemberList = MemberResponse[];

export interface Leader extends Omit<Member, 'absence'> {
  role: string;
}
