import { party } from '../types/party';

const parties = [
  { name: 'Socialdemokraterna', letter: 'S', color: '#c0392b' },
  { name: 'Moderaterna', letter: 'M', color: '#3a539b' },
  { name: 'Sverigedemokraterna', letter: 'SD', color: '#f4d03f' },
  { name: 'Centerpartiet', letter: 'C', color: '#1e824c' },
  { name: 'Vänsterpartiet', letter: 'V', color: '#cf000f' },
  { name: 'Kristdemokraterna', letter: 'KD', color: '#22a7f0' },
  { name: 'Liberalerna', letter: 'L', color: '#5c97bf' },
  { name: 'Miljöpartiet', letter: 'MP', color: '#26a65b' },
];

const getPartyColor = (partyName: party): string =>
  parties.find((p) => p.name === partyName)?.color || '';

export default parties;

export { getPartyColor };
