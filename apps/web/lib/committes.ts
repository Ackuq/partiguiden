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

export const committeeColors: Record<Committee, string> = {
  [Committee.AU]: "#3498db",
  [Committee.CU]: "#f39c12",
  [Committee.FiU]: "#1abc9c",
  [Committee.FöU]: "#2980b9",
  [Committee.JuU]: "#34495e",
  [Committee.KU]: "#d35400",
  [Committee.KrU]: "#8e44ad",
  [Committee.MJU]: "#27ae60",
  [Committee.NU]: "#f1c40f",
  [Committee.SkU]: "#575fcf",
  [Committee.SfU]: "#ef5777",
  [Committee.SoU]: "#ff5e57",
  [Committee.TU]: "#3c40c6",
  [Committee.UbU]: "#808e9b",
  [Committee.UU]: "#f53b57",
  [Committee.UFöU]: "#ffa801",
};

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
