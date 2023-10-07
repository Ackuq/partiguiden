export type DocumentStatus = {
  dokumentstatus: {
    dokument: Document;
    dokutskottsforslag?: {
      utskottsforslag: DocumentProposal | DocumentProposal[];
    };
    dokaktivitet?: {
      aktivitet: DocumentActivity[];
    };
    dokintressent?: {
      intressent: DocumentParticipant[];
    };
    dokuppgift?: { uppgift: DocumentInformation[] };
    dokbilaga?: { bilaga: DocumentAppendix[] };
    dokreferens?: { referens: DocumentReference[] };
  };
};

export type Document = {
  hangar_id: string;
  dok_id: string;
  rm: string;
  beteckning: string;
  typ: string;
  subtyp: string;
  doktyp: string;
  typrubrik: string;
  dokumentnamn: string;
  debattnamn: string;
  tempbeteckning: string;
  organ: string;
  mottagare: string;
  nummer: string;
  slutnummer: string;
  datum: string;
  systemdatum: string;
  publicerad: string;
  titel: string;
  subtitel: string;
  status: string;
  htmlformat: string;
  relaterat_id: string;
  source: string;
  sourceid: string;
  dokument_url_text: string;
  dokument_url_html: string;
  dokumentstatus_url_xml: string;
  utskottsforslag_url_xml?: string;
};

export type DocumentProposal = {
  punkt: string;
  rubrik: string;
  forslag: string;
  beslutstyp: string;
  motforslag_nummer: string;
  motforslag_partier: string;
  votering_id: string;
  votering_sammanfattning_html?: {
    table: DocumentProposalTable | DocumentProposalTable[];
  };
  votering_url_xml: string;
  rm: string;
  bet: string;
  vinnare: string;
  voteringskrav: string;
  beslutsregelkvot: string;
  beslutsregelparagraf: string;
  punkttyp: string;
};

export type OldVotingRow = [
  {
    th: Array<string>;
  },
  {
    td: { h4: string; p: string };
  },
  ...{ td: string[] }[],
];

export type NewVotingRow = {
  th: string;
  td: string[];
};

export type NewVotingTable = {
  caption: {
    b: string;
    br: null;
    "#text": string;
  };
  thead: {
    tr: {
      th: string[];
    };
  };
  tbody: {
    tr: NewVotingRow[];
  };
  tfooter: {
    tr: {
      th: string;
      td: string[];
    };
  };
};

export type OldVotingTable = {
  tr: OldVotingRow;
};

export type DocumentProposalTable = NewVotingTable | OldVotingTable;

export type DocumentActivity = {
  kod: string;
  namn: string;
  datum: string;
  status: string;
  ordning: string;
  process: string;
};

export type DocumentParticipant = {
  intressent_id: string;
  namn: string;
  partibet: string;
  ordning: string;
  roll: string;
};

export type DocumentInformation = {
  kod: string;
  namn: string;
  text: string;
  dok_id: string;
  systemdatum: string;
};

export type DocumentAppendix = {
  dok_id: string;
  subtitel: string;
  filnamn: string;
  filstorlek: string;
  filtyp: string;
  titel: string;
  fil_url: string;
};

export type DocumentReference = {
  referenstyp: string;
  uppgift: string;
  ref_dok_id: string;
  ref_dok_typ: string;
  ref_dok_rm: string;
  ref_dok_bet: string;
  ref_dok_titel: string;
  ref_dok_subtitel: string;
  ref_dok_subtyp: string;
  ref_dok_dokumentnamn: string;
};
