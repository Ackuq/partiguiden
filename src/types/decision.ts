export interface Decision {
  id: string;
  paragraph: string;
  paragraphTitle: string;
  authority: string;
  denomination: string;
  title: string;
  voteSearchTerm: string;
  votesExists: boolean;
}

export interface Decisions {
  pages: number;
  decisions: Array<Decision>;
}
