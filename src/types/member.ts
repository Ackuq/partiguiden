export interface MemberListEntry {
  party: string;
  status: string;
  gender: string;
  id: string;
  district: string;
  firstName: string;
  lastName: string;
  age: number;
  pictureUrl: string;
}
export interface MemberDocument {
  authority: string;
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
  firstName: string;
  lastName: string;
  pictureUrl: string;
  age: number;
  party: string;
  district: string;
  status: string;
  information: Information[];
  tasks: Task[];
  isLeader: boolean;
  absence: number;
}
