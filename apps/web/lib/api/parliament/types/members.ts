import type { Party } from "@partiguiden/party-data/types";

export interface MemberList {
  personlista: {
    "@systemdatum": string;
    "@hits": string;
    person: MemberData[];
  };
}

export interface MemberLookup {
  personlista: {
    "@systemdatum": string;
    "@hits": string;
    person: MemberData;
  };
}

export type MemberParty = Party | "-";

export interface MemberData {
  hangar_guid: string;
  sourceid: string;
  intressent_id: string;
  hangar_id: string;
  fodd_ar: string;
  kon: string;
  efternamn: string;
  tilltalsnamn: string;
  sorteringsnamn: string;
  iort: string;
  parti: MemberParty;
  valkrets: string;
  status: string;
  person_url_xml: string;
  bild_url_80: string;
  bild_url_192: string;
  bild_url_max: string;
  personuppdrag: {
    uppdrag: MemberTask[];
  };
  personuppgift: {
    uppgift: MemberInformation[];
  };
}

export interface MemberTask {
  organ_kod: string;
  roll_kod: string;
  ordningsnummer: string;
  status: string;
  typ: string;
  from: string;
  tom: string;
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  uppgift: ({} | string)[];
  intressent_id: string;
  hangar_id: string;
  sortering: string;
  organ_sortering: string;
  uppdrag_rollsortering: string;
  uppdrag_statussortering: string;
}

export interface MemberInformation {
  kod: string;
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  uppgift: ({} | string)[];
  typ: string;
  intressent_id: string;
  hangar_id: string;
}
