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

export const partyAbbreviations = ['S', 'M', 'SD', 'C', 'V', 'KD', 'L', 'MP'] as const;

export type partyAbbrev = typeof partyAbbreviations[number] | '-';

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
