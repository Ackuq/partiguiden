import type { PartyAbbreviation } from "../utils/parties";

export interface Standpoint {
  id: string;
  title: string;
  content: Array<string>;
  date: string;
  link: string;
  party: PartyAbbreviation;
  subject: number;
}

export interface SubjectListEntry {
  name: string;
  id: number;
  related_subjects: Array<number>;
}

export type SubjectList = Array<SubjectListEntry>;

export type RelatedSubject = SubjectListEntry;

export interface Subject {
  name: string;
  id: number;
  related_subjects: Array<RelatedSubject>;
  standpoints: Array<Standpoint>;
}

export type StandpointsMap = Record<PartyAbbreviation, Array<Standpoint>>;

export type PopularSubjects = Array<[SubjectListEntry, number]>;
