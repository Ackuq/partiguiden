import parties from '../../utils/getParties';

export default [
  { href: '/', title: 'Hem' },
  {
    href: '/partiernas-standpunkter',
    title: 'Partiernas Ståndpunkter',
  },
  {
    href: '/parti/[party]',
    title: 'Partierna',
    subPages: parties.map((party) => ({ title: party.name, id: party.letter.toLocaleLowerCase() })),
  },
  { href: '/riksdagsbeslut', title: 'Riksdagsbeslut' },
  { href: '/voteringar', title: 'Voteringar' },
  { href: '/ledamoter', title: 'Ledamöter' },
  { href: '/om-oss', title: 'Om oss' },
];
