import { partyAbbrev } from './party';

export interface Standpoint {
  id: string;
  title: string;
  content: Array<string>;
  date: string;
  link: string;
  party: partyAbbrev;
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

export type StandpointsMap = Record<partyAbbrev, Array<Standpoint>>;
