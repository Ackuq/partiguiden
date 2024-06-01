import type { Leader } from "../member/types";
import type { WikipediaInfoBox } from "../wikipedia/types";

interface ParliamentPartyData {
  website?: string;
  leaders: Array<Leader>;
}

export interface PartyData extends ParliamentPartyData, WikipediaInfoBox {
  name: string;
  abstract: string;
}
