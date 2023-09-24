import type { Leader } from "./member";
import type { WikipediaInfoBox } from "./wikipedia";

export interface ParliamentPartyData {
  website?: string;
  leaders: Array<Leader>;
}

export interface PartyData extends ParliamentPartyData, WikipediaInfoBox {
  name: string;
  abstract: string;
}
