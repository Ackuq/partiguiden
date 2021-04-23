import { PartyAbbreviation } from './party';

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
}

export interface Subject {
  name: string;
  id: number;
  related_subject: Array<Subject>;
  standpoints: Array<Standpoint>;
}

export type StandpointsMap = Record<PartyAbbreviation, Array<Standpoint>>;

export type PopularSubjects = Array<[SubjectListEntry, number]>;
