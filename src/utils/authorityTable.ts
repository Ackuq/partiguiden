import { AuthorityEntry } from '../types/authority';

const authorityTable: Record<string, AuthorityEntry> = {
  AU: {
    name: 'Arbetsmarknadsutskottet',
    desc: 'Arbetsmarknad och arbetsliv',
    color: '#3498db',
  },
  CU: {
    name: 'Civilutskottet',
    desc: 'Bostad- och konsumentpolitik',
    color: '#f39c12',
  },
  FIU: {
    name: 'Finansutskottet',
    desc: 'Ekonomi och finans',
    color: '#1abc9c',
  },
  FÖU: {
    name: 'Försvarsutskottet',
    desc: 'Försvar och militär',
    color: '#2980b9',
  },
  JUU: {
    name: 'Justitieutskottet',
    desc: 'Rättsväsende och kriminalitet',
    color: '#34495e',
  },
  KU: {
    name: 'Konstitutionsutskottet',
    desc: 'Riksdagen',
    color: '#d35400',
  },
  KRU: {
    name: 'Kulturutskottet',
    desc: 'Kultur och folkbildning',
    color: '#8e44ad',
  },
  MJU: {
    name: 'Miljö- och jordbruksutskottet',
    desc: 'Miljö och jordbruk',
    color: '#27ae60',
  },
  NU: {
    name: 'Näringsutskottet',
    desc: 'Näringsliv och energi',
    color: '#f1c40f',
  },
  SKU: {
    name: 'Skatteutskottet',
    desc: 'Skatter',
    color: '#575fcf',
  },
  SFU: {
    name: 'Socialförsäkringsutskottet',
    desc: 'Socialförsäkringar',
    color: '#ef5777',
  },
  SOU: {
    name: 'Socialutskottet',
    desc: 'Vård och omsorg',
    color: '#ff5e57',
  },
  TU: {
    name: 'Trafikutskottet',
    desc: 'Trafik och transport',
    color: '#3c40c6',
  },
  UBU: {
    name: 'Utbildningsutskottet',
    desc: 'Utbildning',
    color: '#808e9b',
  },
  UU: {
    name: 'Utrikesutskottet',
    desc: 'Utrikes',
    color: '#f53b57',
  },
  UFÖU: {
    name: 'Sammansatta utrikes- och försvarsutskottet',
    desc: 'Utrikesförsvar',
    color: '#ffa801',
  },
};

const lookupAuthority = (authority: string): AuthorityEntry | undefined =>
  authorityTable[authority.toUpperCase()];

export { authorityTable, lookupAuthority };
