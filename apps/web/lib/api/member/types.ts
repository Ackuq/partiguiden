import type { Committee } from "@lib/committees";
import type { Party } from "@partiguiden/party-data/types";

export interface MemberDocument {
  committee?: Committee;
  title: string;
  subtitle: string;
  altTitle: string;
  id: string;
}

export interface MemberDocuments {
  pages: number;
  count: number;
  documents: MemberDocument[];
}

export interface Information {
  code: string;
  content: string[];
  type: string;
}

export interface Task {
  committee: string;
  role: string;
  content: string[];
  status?: string;
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
  absence?: number;
}

export enum AbsencePeriod {
  mandatePeriod = "mandatperiod",
  parliamentYear = "riksmöte",
}
export interface Absence {
  value?: number;
  description: string;
}

export interface MemberDetailedResponse extends MemberResponse {
  absence: {
    mandatePeriod: Absence;
    parliamentYear: Absence;
  };
}

export interface AbsenceLeaderboard {
  mostAbsence: MemberAbsenceResponse[];
  leastAbsence: MemberAbsenceResponse[];
}

export interface Leader extends MemberResponse {
  role: string;
}
