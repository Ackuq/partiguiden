import type { MemberParty } from "./members";

export interface SpeechDocumentResponse {
  anforande: SpeechDocument;
}

export interface SpeechDocument {
  dok_hangar_id: string;
  dok_id: string;
  dok_titel: string;
  dok_rm: string;
  dok_nummer: string;
  dok_datum: Date;
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
  systemdatum: Date;
  systemnyckel: string;
  protokoll_url_www: string;
}
