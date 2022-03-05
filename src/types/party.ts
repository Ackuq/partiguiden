import { Leader } from './member';
import { Party, PartyAbbreviation } from '../utils/parties';

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

export interface Abstract {
  abstract: string;
  abstractMD: string;
}
