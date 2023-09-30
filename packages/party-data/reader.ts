import s from "./parties/s.json";
import sd from "./parties/sd.json";
import m from "./parties/m.json";
import mp from "./parties/mp.json";
import l from "./parties/l.json";
import kd from "./parties/kd.json";
import c from "./parties/c.json";
import v from "./parties/v.json";
import subjects from "./subjects.json";
import type { Standpoint } from "./types";
import { Party, type Subject } from "./types";

export function getSubjects(): Subject[] {
  return Object.values(subjects);
}

export function getSubject(id: string): Subject | undefined {
  return getSubjects().find((subject) => subject.id === id);
}

function getPartyData(abbreviation: string) {
  switch (abbreviation.toLocaleUpperCase()) {
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
  return Object.values(getPartyData(abbreviation));
}

export function getStandpointsForSubject(subject: string) {
  return Object.values(Party)
    .sort()
    .reduce<Record<Party, Standpoint[]>>(
      (prev, party) => {
        const partyStandpoints = readPartyStandpoints(party).filter(
          (standpoint) => standpoint.subject === subject,
        );
        if (partyStandpoints.length === 0) {
          return prev;
        }
        return {
          ...prev,
          [party]: partyStandpoints,
        };
      },
      {} as Record<Party, Standpoint[]>,
    );
}

export function readPartyDataForSubject(party: Party, subjectName: string) {
  const partyData = readPartyStandpoints(party);
  return partyData.filter((subject) => subject.subject === subjectName);
}

export function readAllStandpoints(): Standpoint[] {
  return Object.values(Party).map(readPartyStandpoints).flat();
}

export function readNotCategorizedStandpoints() {
  const standpoints = readAllStandpoints();
  return standpoints.filter((standpoint) => standpoint.subject === undefined);
}

export function readSubjects(): Subject[] {
  return Object.values(subjects);
}
