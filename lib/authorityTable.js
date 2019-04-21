const table = [
  {
    code: "AU",
    name: "Arbetsmarknadsutskottet",
    desc: "Arbetsmarknad och arbetsliv",
    color: "#3498db"
  },
  {
    code: "CU",
    name: "Civilutskottet",
    desc: "Bostad- och konsumentpolitik",
    color: "#f39c12"
  },
  {
    code: "FiU",
    name: "Finansutskottet",
    desc: "Ekonomi och finans",
    color: "#1abc9c"
  },
  {
    code: "FöU",
    name: "Försvarsutskottet",
    desc: "Försvar och militär",
    color: "#2980b9"
  },
  {
    code: "JuU",
    name: "Justitieutskottet",
    desc: "Rättsväsende och kriminalitet",
    color: "#34495e"
  },
  {
    code: "KU",
    name: "Konstitutionsutskottet",
    desc: "Riksdagen",
    color: "#d35400"
  },
  {
    code: "KrU",
    name: "Kulturutskottet",
    desc: "Kultur och folkbildning",
    color: "#8e44ad"
  },
  {
    code: "MJU",
    name: "Miljö- och jordbruksutskottet",
    desc: "Miljö och jordbruk",
    color: "#27ae60"
  },
  {
    code: "NU",
    name: "Näringsutskottet",
    desc: "Näringsliv och energi",
    color: "#f1c40f"
  },
  {
    code: "SkU",
    name: "Skatteutskottet",
    desc: "Skatter",
    color: "#575fcf"
  },
  {
    code: "SfU",
    name: "Socialförsäkringsutskottet",
    desc: "Socialförsäkringar",
    color: "#ef5777"
  },
  {
    code: "SoU",
    name: "Socialutskottet",
    desc: "Vård och omsorg",
    color: "#ff5e57"
  },
  {
    code: "TU",
    name: "Trafikutskottet",
    desc: "Trafik och transport",
    color: "#3c40c6"
  },
  {
    code: "UbU",
    name: "Utbildningsutskottet",
    desc: "Utbildning",
    color: "#808e9b"
  },
  {
    code: "UU",
    name: "Utrikesutskottet",
    desc: "Utrike",
    color: "#f53b57"
  },
  {
    code: "UFöU",
    name: "Sammansatta utrikes- och försvarsutskottet",
    desc: "Utrikesförsvar",
    color: "#ffa801"
  }
];

export default organ => {
  return table.find(el => {
    return el.code === organ;
  });
};
