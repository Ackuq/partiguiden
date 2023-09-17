import { PartyAbbreviation } from '../../utils/parties';

// eslint-disable-next-line import/prefer-default-export
export const wikipediaPartyMap: Record<Lowercase<PartyAbbreviation>, string> = {
  s: 'Socialdemokraterna_(Sverige)',
  m: 'Moderaterna',
  sd: 'Sverigedemokraterna',
  c: 'Centerpartiet',
  v: 'Vänsterpartiet',
  kd: 'Kristdemokraterna_(Sverige)',
  l: 'Liberalerna',
  mp: 'Miljöpartiet',
};
