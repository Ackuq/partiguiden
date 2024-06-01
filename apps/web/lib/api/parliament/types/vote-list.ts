export type VoteringNameGroupLookup = {
  voteringlista: {
    "@antal": string;
    votering: VoteringNameGroup;
  };
};

type VoteringNameGroup = {
  namn: string;
  Ja: string;
  Nej: string;
  Frånvarande: string;
  Avstår: string;
};
