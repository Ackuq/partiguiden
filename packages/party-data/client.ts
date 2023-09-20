import s from "./parties/s.json";
import sd from "./parties/sd.json";
import m from "./parties/m.json";
import mp from "./parties/mp.json";
import l from "./parties/l.json";
import kd from "./parties/kd.json";
import c from "./parties/c.json";
import v from "./parties/v.json";
import subjects from "./subjects.json";

enum Party {
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

export function getSubjects(): Subject[] {
  return Object.values(subjects);
}

function getPartyData(abbreviation: string) {
  switch (abbreviation.toLocaleLowerCase()) {
    case Party.S:
      return s;
    case Party.SD:
      return sd;
    case Party.M:
      return m;
    case Party.MP:
      return mp;
    case Party.C:
      return c;
    case Party.L:
      return l;
    case Party.V:
      return v;
    case Party.KD:
      return kd;
  }
  throw new Error(`No such party ${abbreviation}`);
}

export function readPartyStandpoints(abbreviation: Party): Standpoint[] {
  return Object.values(getPartyData(abbreviation) as unknown);
}

export function readPartyDataForSubject(party: Party, subjectName: string) {
  const partyData = readPartyStandpoints(party);
  return partyData.filter((subject) => subject.subject === subjectName);
}

export function readAllStandpoints(): Standpoint[] {
  return Object.values(Party).map(readPartyStandpoints).flat();
}
