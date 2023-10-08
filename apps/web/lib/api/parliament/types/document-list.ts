import type { MemberParty } from "./members";

export type DocumentList = {
  dokumentlista: {
    dokument: DocumentListEntry[];
  };
};

export type DocumentListEntry = {
  traff: string;
  domain: string;
  database: string;
  datum: string;
  id: string;
  rdrest: null;
  slutdatum: string;
  rddata: null;
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
  organ: string;
  relaterat_id: string;
  doktyp: string;
  typ: string;
  subtyp: string;
  beteckning: string;
  tempbeteckning: string;
  nummer: string;
  status: string;
  score: string;
  sokdata: SearchData;
  summary: string;
  notisrubrik: string;
  notis: string;
  dokintressent: { intressent: DocumentListParticipant[] } | null;
  filbilaga: { fil: DocumentListFileAppendix[] } | null;
  avdelning: string;
  avdelningar: { avdelning: string[] };
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
  debatt: { anforande: DocumentListSpeeches[] } | null;
  debattnamn?: string;
  dokumentnamn: string;
};

export type SearchData = {
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
  parti_telefontider: string;
  parti_logotyp_img_id: string;
  parti_logotyp_img_url: string;
  parti_logotyp_img_alt: string;
  parti_mandat: string;
  kalenderprio: string;
};

export type DocumentListSpeeches = {
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
};

export type DocumentListParticipant = {
  roll: string;
  namn: string;
  partibet: string;
  intressent_id: string;
};

export type DocumentListFileAppendix = {
  typ: string;
  namn: string;
  storlek: string;
  url: string;
};
