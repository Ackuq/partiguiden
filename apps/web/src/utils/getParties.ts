import { PartyAbbreviation, PartyInfo, parties } from './parties';

export const newBlocks = {
  name: 'Nya blocken',
  values: [
    {
      name: 'Vänsterblocket',
      parties: ['S', 'V', 'MP', 'C'] as Array<PartyAbbreviation>,
      color: '#c0392b',
    },
    {
      name: 'Högerblocket',
      parties: ['M', 'SD', 'KD', 'L'] as Array<PartyAbbreviation>,
      color: '#3a539b',
    },
  ],
} as const;

export const classicBlocks = {
  name: 'Klassiska blocken',
  values: [
    {
      name: 'Vänsterblocket',
      parties: ['S', 'V', 'MP'] as Array<PartyAbbreviation>,
      color: '#c0392b',
    },
    { name: 'Sverigedemokraterna', parties: ['SD'] as Array<PartyAbbreviation>, color: '#f4d03f' },
    {
      name: 'Högerblocket',
      parties: ['M', 'C', 'KD', 'L'] as Array<PartyAbbreviation>,
      color: '#3a539b',
    },
  ],
} as const;

export const allBlocks = [newBlocks, classicBlocks];

export type Blocks = typeof classicBlocks | typeof newBlocks;

export const partiesMap = parties.reduce(
  (prev, curr) => ({ ...prev, [curr.letter]: curr }),
  {} as Record<PartyAbbreviation, PartyInfo>
);

export default parties;
