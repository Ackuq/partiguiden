import type { Party } from "@partiguiden/party-data/types";

export interface MemberDocument {
  committee: string | null;
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
  committee: string;
  role: string;
  content: Array<string>;
  status: string | null;
  type: string;
  from: string;
  to: string;
}

export interface MemberListEntry {
  id: string;
  firstName: string;
  lastName: string;
  pictureUrl: string;
  age: number;
  party: Party | "-";
  district: string;
  status: string;
}

export interface MemberResponse extends MemberListEntry {
  sourceId: string;
  pictureUrlLowRes: string;
  information: Information[];
  tasks: Task[];
  isLeader: boolean;
}

export interface MemberAbsenceResponse extends MemberListEntry {
  absence: number | null;
}

export enum AbsencePeriod {
  mandatePeriod = "mandatperiod",
  parliamentYear = "riksmöte",
}
export interface Absence {
  value: number | null;
  description: string;
}

export interface MemberDetailedResponse extends MemberResponse {
  absence: {
    mandatePeriod: Absence;
    parliamentYear: Absence;
  };
}

export interface MemberAbsenceResponseNullSafe extends MemberResponse {
  absence: number;
}

export interface AbsenceLeaderboard {
  mostAbsence: MemberAbsenceResponse[];
  leastAbsence: MemberAbsenceResponse[];
}

export interface Leader extends MemberResponse {
  role: string;
}
