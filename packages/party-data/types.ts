export enum Party {
  S = "s",
  SD = "sd",
  M = "m",
  MP = "mp",
  L = "l",
  KD = "kd",
  C = "c",
  V = "v",
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
