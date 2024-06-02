export interface VoteringNameGroupLookup {
  voteringlista: {
    "@antal": string;
    votering: VoteringNameGroup;
  };
}

interface VoteringNameGroup {
  namn: string;
  Ja: string;
  Nej: string;
  Frånvarande: string;
  Avstår: string;
}
