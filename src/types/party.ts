import { PartyAbbreviation, Party } from '../utils/parties';
import { Leader } from './member';

export interface WikipediaInfoBox {
  ideology: string[];
}

export interface ParliamentPartyData {
  website?: string;
  leaders: Array<Leader>;
}

export interface PartyData extends ParliamentPartyData, WikipediaInfoBox {
  name: Party;
  abbrev: PartyAbbreviation;
  abstract: string;
}
