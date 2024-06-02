import c from "./data/parties/C.json";
import kd from "./data/parties/KD.json";
import l from "./data/parties/L.json";
import m from "./data/parties/M.json";
import mp from "./data/parties/MP.json";
import s from "./data/parties/S.json";
import sd from "./data/parties/SD.json";
import v from "./data/parties/V.json";
import subjects from "./data/subjects.json";
import type { Standpoint } from "./types";
import { Party, partySortOrder } from "./types";
import type { Subject } from "./types";

export function getSubjects(): Subject[] {
  return Object.values(subjects);
}

export function getSubject(id: string): Subject | undefined {
  return getSubjects().find((subject) => subject.id === id);
}

function getPartyData(abbreviation: string) {
  switch (abbreviation.toLocaleUpperCase() as Party) {
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
}

export function readPartyStandpoints(abbreviation: Party): Standpoint[] {
  return Object.values(getPartyData(abbreviation));
}

export function getStandpointsForSubject(subject: string) {
  return partySortOrder.reduce<Record<Party, Standpoint[]>>(
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
