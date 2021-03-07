import { Member } from './member';

export type party =
  | 'Socialdemokraterna'
  | 'Moderaterna'
  | 'Sverigedemokraterna'
  | 'Centerpartiet'
  | 'Vänsterpartiet'
  | 'Kristdemokraterna'
  | 'Liberalerna'
  | 'Miljöpartiet';

export type partyAbbrev = 'S' | 'M' | 'SD' | 'C' | 'V' | 'KD' | 'L' | 'MP' | '-';

export interface Leader extends Member {
  role: string;
}

export interface PartyData {
  name: party;
  abbrev: partyAbbrev;
  website: string;
  leaders: Array<Leader>;
  abstract: string;
  ideology: Array<string>;
}
