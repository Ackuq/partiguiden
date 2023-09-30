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
    color: "#3498db",
  },
  [Committee.CU]: {
    name: "Civilutskottet",
    desc: "Bostad- och konsumentpolitik",
    color: "#f39c12",
  },
  [Committee.FiU]: {
    name: "Finansutskottet",
    desc: "Ekonomi och finans",
    color: "#1abc9c",
  },
  [Committee.FöU]: {
    name: "Försvarsutskottet",
    desc: "Försvar och militär",
    color: "#2980b9",
  },
  [Committee.JuU]: {
    name: "Justitieutskottet",
    desc: "Rättsväsende och kriminalitet",
    color: "#34495e",
  },
  [Committee.KU]: {
    name: "Konstitutionsutskottet",
    desc: "Riksdagen",
    color: "#d35400",
  },
  [Committee.KrU]: {
    name: "Kulturutskottet",
    desc: "Kultur och folkbildning",
    color: "#8e44ad",
  },
  [Committee.MJU]: {
    name: "Miljö- och jordbruksutskottet",
    desc: "Miljö och jordbruk",
    color: "#27ae60",
  },
  [Committee.NU]: {
    name: "Näringsutskottet",
    desc: "Näringsliv och energi",
    color: "#f1c40f",
  },
  [Committee.SkU]: {
    name: "Skatteutskottet",
    desc: "Skatter",
    color: "#575fcf",
  },
  [Committee.SfU]: {
    name: "Socialförsäkringsutskottet",
    desc: "Socialförsäkringar",
    color: "#ef5777",
  },
  [Committee.SoU]: {
    name: "Socialutskottet",
    desc: "Vård och omsorg",
    color: "#ff5e57",
  },
  [Committee.TU]: {
    name: "Trafikutskottet",
    desc: "Trafik och transport",
    color: "#3c40c6",
  },
  [Committee.UbU]: {
    name: "Utbildningsutskottet",
    desc: "Utbildning",
    color: "#808e9b",
  },
  [Committee.UU]: {
    name: "Utrikesutskottet",
    desc: "Utrikes",
    color: "#f53b57",
  },
  [Committee.UFöU]: {
    name: "Sammansatta utrikes- och försvarsutskottet",
    desc: "Utrikesförsvar",
    color: "#ffa801",
  },
};
