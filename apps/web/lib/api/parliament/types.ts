import type { Committee } from "@lib/committes";
import type { Party } from "@partiguiden/party-data/types";

export type MemberParty = Party | "-";

export interface Document {
  hangar_id: number;
  dok_id: string;
  rm: string;
  beteckning: string;
  typ: string;
  subtyp: string;
  doktyp: string;
  typrubrik: string;
  dokumentnamn: string;
  debattnamn: string;
  tempbeteckning: string;
  organ: string;
  mottagare: string;
  nummer: string;
  slutnummer: string;
  datum: string;
  systemdatum: string;
  publicerad: string;
  titel: string;
  subtitel: string;
  status: string;
  htmlformat: string;
  relaterat_id: string;
  source: string;
  sourceid: string;
  dokument_url_text: string;
  dokument_url_html: string;
  dokumentstatus_url_xml: string;
  utskottsforslag_url_xml: string;
}

export type VotingRowEntry = { td: Array<string> };

export type NewVotingRow = {
  th: string; // Party
  td: string[]; // Votes: yes, no, refrain, absent
};

export type OldVotingRow = [
  {
    th: Array<string>;
  },
  {
    td: { h4: string; p: string };
  },
  ...VotingRowEntry[],
];

export type OldVotingTable = {
  tr: OldVotingRow;
};

export type NewVotingTable = {
  tbody: {
    tr: NewVotingRow[];
  };
};

export type VotingTable = OldVotingTable | NewVotingTable;

export interface DocumentComitteeProposal {
  // Proposals made in the document
  punkt: string;
  rubrik: string;
  forslag: string;
  beslutstyp: string;
  motforslag_nummer: string;
  motforslag_partier: string;
  votering_id: string;
  votering_sammanfattning_html: {
    table: VotingTable | VotingTable[];
  };
  votering_ledamot_url_xml: string;
  rm: string;
  bet: string;
  vinnare: string;
  voteringskrav: string;
  beslutsregelkvot: string;
  beslutsregelparagraf: string;
  punktyp: string;
}

export interface DocumentCounterProposal {
  // Responses to proposal
  nummer: string;
  rubrik: string;
  partier: string;
  typ: string;
  utskottsforslag_punkt: string;
}

export interface DocumentActivity {
  kod: string;
  namn: string;
  datum: string;
  status: string;
  ordning: string;
  process: string;
}

export interface DocumentParticipant {
  intressent_id: string;
  namn: string;
  partibet: string;
  ordning: string;
  roll: string;
}

export interface DocumentProposal {
  nummer: string;
  beteckning: string;
  lydelse: string;
  lydelse2: string;
  utskottet: string;
  kammaren: string;
  behandlas_i: string;
  behandlas_i_punkt: string;
  kammarbeslutstyp: string;
  intressent: string;
  avsnitt: string;
  grundforfattning: string;
  andringsforfattning: string;
}

export interface DocumentInformation {
  kod: string;
  namn: string;
  text: string;
  dok_id: string;
  systemdatum: string;
}

export interface DocumentAttachment {
  dok_id: string;
  titel: string;
  subtitel: string;
  filnamn: string;
  filstorlek: string;
  filtyp: string;
  fil_url: string;
}

export interface DocumentFile {
  typ: string;
  namn: string;
  storlek: string;
  url: string;
}

export interface DocumentReference {
  referenstyp: string;
  uppgift: string;
  ref_dok_id: string;
  ref_dok_typ: string;
  ref_dok_rm: string;
  ref_dok_bet: string;
  ref_dok_titel: string;
  ref_dok_subtitel: string;
  ref_dok_subtyp: string;
  ref_dok_dokumentnamn: string;
}

export interface Statement {
  parti: MemberParty;
  parent_ardome_id: string;
  tumnagel: string;
  tumnagel_stor: string;
  ardome_id: string;
  thumbnail_url: string;
  anf_nummer: string;
  anf_datumtid: string;
  anf_klockslag: string;
  anf_sekunder: string;
  talare: string;
  video_url: string;
  intressent_id: string;
  anf_text: string;
}

export interface Vote {
  hangar_id: string;
  rm: string;
  beteckning: string;
  punkt: string;
  votering_id: string;
  intressent_id: string;
  namn: string;
  fornamn: string;
  efternamn: string;
  valkrets: string;
  iort: string;
  parti: MemberParty;
  banknummer: string;
  kon: string;
  fodd: string;
  rost: string;
  avser: string;
  votering: string;
  votering_url_xml: string;
  dok_id: string;
  systemdatum: string;
}

export interface GroupedVote {
  namn: string;
  Ja: string;
  Nej: string;
  Frånvarande: string;
  Avstår: string;
}

export interface StatementDocument {
  anforande: {
    dok_hangar_id: string;
    dok_id: string;
    dok_titel: string;
    dok_rm: string;
    dok_nummer: string;
    dok_datum: string;
    avsnittsrubrik: string;
    underrubrik: string;
    kammaraktivitet: string;
    anforande_id: string;
    anforande_nummer: string;
    talare: string;
    parti: MemberParty;
    anforandetext: string;
    intressent_id: string;
    rel_dok_id: string;
    replik: string;
    systemdatum: string;
    systemnyckel: string;
    protokoll_url_www: string;
  };
}

export interface Person {
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
    uppdrag: PersonTask[];
  };
  personuppgift: {
    uppgift: PersonInformation[];
  };
}

export interface PersonTask {
  organ_kod: string;
  roll_kod: string;
  ordningsnummer: string;
  status: string;
  typ: string;
  from: string;
  tom: string;
  uppgift: Array<string> | Record<string, never> | [Record<string, never>];
  intressent_id: string;
  hangar_id: string;
  sortering: string;
  organ_sortering: string;
  uppdrag_rollsortering: string;
  uppdrag_statussortering: string;
}

export interface PersonInformation {
  kod: string;
  uppgift: Array<string> | Record<string, never> | [Record<string, never>];
  typ: string;
  intressent_id: string;
  hangar_id: string;
}

export interface DocumentStatus<T> {
  dokumentstatus: {
    dokument: Document;
  } & T;
}

export interface UnknownDocumentStatus {
  dokutskottsforslag?: {
    utskottsforslag: DocumentComitteeProposal[] | DocumentComitteeProposal;
  };
  dokmotforslag?: {
    motforslag: DocumentCounterProposal[];
  };
  dokforslag?: {
    forslag: DocumentProposal[];
  };
  dokaktivitet?: {
    aktivitet: DocumentActivity[];
  };
  dokintressent?: {
    intressent: DocumentParticipant[];
  };
  dokuppgift?: {
    uppgift: DocumentInformation[];
  };
  dokbilaga?: {
    bilaga: DocumentAttachment[];
  };
  dokreferens?: {
    referens: DocumentReference[] | DocumentReference;
  };
}

export type VoteDocumentStatus = DocumentStatus<{
  dokutskottsforslag: {
    utskottsforslag: DocumentComitteeProposal[] | DocumentComitteeProposal;
  };
  dokmotforslag: {
    motforslag: DocumentCounterProposal[];
  };
  dokaktivitet: {
    aktivitet: DocumentActivity[];
  };
  dokuppgift: {
    uppgift: DocumentInformation[];
  };
  dokbilaga: {
    bilaga: DocumentAttachment[];
  };
  dokreferens: {
    referens: DocumentReference[];
  };
}>;

export interface DocumentListEntry {
  traff: string;
  domain: string;
  database: string;
  datum: string;
  id: string;
  rdrest: string | null;
  slutdatum: string;
  rddata: string | null;
  plats: string;
  klockslag: string;
  publicerad: string;
  systemdatum: string;
  undertitel: string;
  kalla: string;
  kall_id: string;
  dok_id: string;
  dokumentformat: string;
  dokument_url_text: string;
  dokument_url_html: string;
  inlamnad: string;
  motionstid: string;
  tilldelat: string;
  lang: string;
  url: string;
  relurl: string;
  titel: string;
  rm: string;
  organ: Committee;
  relaterat_id: string;
  doktyp: string;
  typ: string;
  subtyp: string;
  beteckning: string;
  tempbeteckning: string;
  nummer: string;
  status: string;
  score: string;
  sokdata: {
    titel: string;
    undertitel: string;
    soktyp: string;
    statusrad: string;
    brodsmula: string;
    parti_kod: string;
    parti_namn: string;
    parti_website_url: string;
    parti_website_namn: string;
    parti_epost: string;
    parti_telefon: string;
    parti_logotyp_img_id: string;
    parti_logotyp_img_url: string;
    parti_logotyp_img_alt: string;
    parti_mandat: string;
  };
  summary: string;
  notisrubrik: string;
  notis: string;
  dokintressent: {
    intressent: Array<DocumentParticipant>;
  };
  filbilaga: {
    fil: Array<DocumentFile>;
  };
  avdelning: string;
  struktur: string;
  audio: string;
  video: string;
  debattgrupp: string;
  debattdag: string;
  beslutsdag: string;
  beredningsdag: string;
  justeringsdag: string;
  beslutad: string;
  debattsekunder: string;
  ardometyp: string;
  reservationer: string;
  debatt: {
    anforande: Array<Statement> | Statement;
  };
  debattnamn: string;
  dokumentnamn: string;
}

export interface DocumentList {
  dokumentlista: {
    "@ms": string;
    "@version": string;
    "@q": string;
    "@varning": string;
    "@datum": string;
    "@nasta_sida": string;
    "@sida": string;
    "@sidor": string;
    "@beta": string;
    "@traff_fran": string;
    "@traff_till": string;
    "@traffar": string;
    "@dPre": string;
    "@dSol": string;
    "@dDt": string;
    "@dR": string;
    facettlista: null;
    dokument?: DocumentListEntry[];
  };
}

interface PersonList<T> {
  personlista: {
    "@systemdatum": string;
    "@hits": string;
    person: T;
  };
}

export type PersonListMany = PersonList<Person[]>;
export type PersonListSingle = PersonList<Person>;

interface VoteList<T> {
  voteringlista: {
    "@grupp8": "";
    "@grupp7": "";
    "@grupp6": "";
    "@grupp5": "";
    "@grupp4": "";
    "@grupp3": "";
    "@grupp1": "";
    "@grupp2": "";
    "@gruppering": "";
    "@villkor": "";
    "@antal": "500";
    votering?: T;
  };
}

export type VoteListAll = VoteList<Vote[]>;
export type VoteListSingle = VoteList<Vote>;
export type VoteListGroupedAll = VoteList<GroupedVote[]>;
export type VoteListGroupedSingle = VoteList<GroupedVote>;

export interface ParliamentYearResponse {
  riksmote: string;
  id: string;
  start: string;
  slut: string;
  mandatperiod: string;
}
export interface ParliamentYearsResponse {
  riksmoten: {
    "@systemdatum": string;
    riksmote: ParliamentYearResponse[];
  };
}
