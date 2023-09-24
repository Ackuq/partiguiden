import type { Leader } from "./member";

export interface WikipediaInfoBox {
  website?: string;
  leaders: Leader[];
  ideology: string[];
}
