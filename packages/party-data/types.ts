export enum Party {
  S = "S",
  SD = "SD",
  M = "M",
  MP = "MP",
  L = "L",
  KD = "KD",
  C = "C",
  V = "V",
}

export interface Subject {
  id: string;
  name: string;
  relatedSubjects: string[];
}

export interface Standpoint {
  title: string;
  url: string;
  opinions: string[];
  fetchDate: string;
  party: string;
  subject?: string;
}

export interface SubjectData {
  [id: string]: Subject;
}

export interface PartyData {
  [url: string]: Standpoint;
}

export type PartyDataWithoutPartyName = Omit<Standpoint, "party">;
