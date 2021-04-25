import { PartyAbbreviation } from '../utils/parties';

export interface Polls {
  [year: number]: Record<
    number,
    Array<{
      from: string;
      to: string;
      year: number;
      month: number;
      day: number | null;
      institute: string;
      data: Record<PartyAbbreviation, number>;
    }>
  >;
}
