export type VoteringList = {
  voteringlista: {
    "@antal": string;
    votering: VoteringItem[];
  };
};

export type VoteringNameGroupLookup = {
  voteringlista: {
    "@antal": string;
    votering: VoteringNameGroup;
  };
};

export type VoteringNameGroup = {
  namn: string;
  Ja: string;
  Nej: string;
  Frånvarande: string;
  Avstår: string;
};

export type VoteringItem = {
  hangar_id: string;
  rm: string;
  beteckning: string;
  punkt: string;
  votering_id: string;
  intressent_id: string;
  namn: string;
  fornamn: string;
  efternamn: string;
  valkrets: string;
  iort: string;
  parti: string;
  banknummer: string;
  kon: string;
  fodd: string;
  rost: string;
  avser: string;
  votering: string;
  votering_url_xml: string;
  dok_id: string;
  systemdatum: string;
};
