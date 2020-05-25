export type party =
  | 'Socialdemokraterna'
  | 'Moderaterna'
  | 'Sverigedemokraterna'
  | 'Centerpartiet'
  | 'Vänsterpartiet'
  | 'Kristdemokraterna'
  | 'Liberalerna'
  | 'Miljöpartiet';

export type partyAbbrev = 'S' | 'M' | 'SD' | 'C' | 'V' | 'KD' | 'L' | 'MP';

export interface Subject {
  name: string;
  opinions: Array<string>;
  url: string;
}

export interface PartySubject {
  name: party;
  data: Array<Subject>;
}
