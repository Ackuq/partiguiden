import { PartyAbbreviation, Party } from '../utils/parties';
import { Leader } from './member';

export interface PartyData {
  name: Party;
  abbrev: PartyAbbreviation;
  website: string;
  leaders: Array<Leader>;
  abstract: string;
  ideology: Array<string>;
}
