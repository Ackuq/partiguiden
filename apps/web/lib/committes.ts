export enum Committee {
  AU = "AU",
  CU = "CU",
  FiU = "FiU",
  FöU = "FöU",
  JuU = "JuU",
  KU = "KU",
  KrU = "KrU",
  MJU = "MJU",
  NU = "NU",
  SkU = "SkU",
  SfU = "SfU",
  SoU = "SoU",
  TU = "TU",
  UbU = "UbU",
  UU = "UU",
  UFöU = "UFöU",
}

export interface CommitteeInformation {
  name: string;
  desc: string;
}

export const committeeInfo: Record<Committee, CommitteeInformation> = {
  [Committee.AU]: {
    name: "Arbetsmarknadsutskottet",
    desc: "Arbetsmarknad och arbetsliv",
  },
  [Committee.CU]: {
    name: "Civilutskottet",
    desc: "Bostad- och konsumentpolitik",
  },
  [Committee.FiU]: {
    name: "Finansutskottet",
    desc: "Ekonomi och finans",
  },
  [Committee.FöU]: {
    name: "Försvarsutskottet",
    desc: "Försvar och militär",
  },
  [Committee.JuU]: {
    name: "Justitieutskottet",
    desc: "Rättsväsende och kriminalitet",
  },
  [Committee.KU]: {
    name: "Konstitutionsutskottet",
    desc: "Riksdagen",
  },
  [Committee.KrU]: {
    name: "Kulturutskottet",
    desc: "Kultur och folkbildning",
  },
  [Committee.MJU]: {
    name: "Miljö- och jordbruksutskottet",
    desc: "Miljö och jordbruk",
  },
  [Committee.NU]: {
    name: "Näringsutskottet",
    desc: "Näringsliv och energi",
  },
  [Committee.SkU]: {
    name: "Skatteutskottet",
    desc: "Skatter",
  },
  [Committee.SfU]: {
    name: "Socialförsäkringsutskottet",
    desc: "Socialförsäkringar",
  },
  [Committee.SoU]: {
    name: "Socialutskottet",
    desc: "Vård och omsorg",
  },
  [Committee.TU]: {
    name: "Trafikutskottet",
    desc: "Trafik och transport",
  },
  [Committee.UbU]: {
    name: "Utbildningsutskottet",
    desc: "Utbildning",
  },
  [Committee.UU]: {
    name: "Utrikesutskottet",
    desc: "Utrikes",
  },
  [Committee.UFöU]: {
    name: "Sammansatta utrikes- och försvarsutskottet",
    desc: "Utrikesförsvar",
  },
};
