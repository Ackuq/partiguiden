import type { Committee } from "@lib/committees";

export interface Decision {
  id: string;
  paragraph: string;
  paragraphTitle: string;
  committee?: Committee;
  denomination: string;
  title: string;
  voteSearchTerm: string;
  votesExists: boolean;
}

export interface Decisions {
  pages: number;
  decisions: Decision[];
}
