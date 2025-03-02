import c from "./data/parties/C.json" with { type: "json" };
import kd from "./data/parties/KD.json" with { type: "json" };
import l from "./data/parties/L.json" with { type: "json" };
import m from "./data/parties/M.json" with { type: "json" };
import mp from "./data/parties/MP.json" with { type: "json" };
import s from "./data/parties/S.json" with { type: "json" };
import sd from "./data/parties/SD.json" with { type: "json" };
import v from "./data/parties/V.json" with { type: "json" };
import subjects from "./data/subjects.json" with { type: "json" };
import type { Party, Standpoint } from "./types.ts";
import { parties, partySortOrder } from "./types.ts";
import type { Subject } from "./types.ts";

export function getSubjects(): Subject[] {
  return Object.values(subjects);
}

export function getSubject(id: string): Subject | undefined {
  return getSubjects().find((subject) => subject.id === id);
}

function getPartyData(abbreviation: string) {
  switch (abbreviation.toLocaleUpperCase()) {
    case parties.S:
      return s;
    case parties.SD:
      return sd;
    case parties.M:
      return m;
    case parties.MP:
      return mp;
    case parties.C:
      return c;
    case parties.L:
      return l;
    case parties.V:
      return v;
    case parties.KD:
      return kd;
    default:
      throw new Error(
        `No party with abbreviation ${abbreviation.toLocaleUpperCase()}`,
      );
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
  return Object.values(parties).map(readPartyStandpoints).flat();
}

export function readNotCategorizedStandpoints() {
  const standpoints = readAllStandpoints();
  return standpoints.filter((standpoint) => standpoint.subject === undefined);
}

export function readSubjects(): Subject[] {
  return Object.values(subjects);
}
