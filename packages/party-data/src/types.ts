export const parties = {
  S: "S",
  SD: "SD",
  M: "M",
  MP: "MP",
  L: "L",
  KD: "KD",
  C: "C",
  V: "V",
} as const;
export type Party = (typeof parties)[keyof typeof parties];

export const partySortOrder = [
  parties.S,
  parties.SD,
  parties.M,
  parties.V,
  parties.C,
  parties.KD,
  parties.MP,
  parties.L,
] as const;

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

export type SubjectData = Record<string, Subject>;

export type PartyData = Record<string, Standpoint>;

export type PartyDataWithoutPartyName = Omit<Standpoint, "party">;
