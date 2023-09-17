import type { PartyAbbreviation } from "../utils/parties";

interface Poll {
  from: string;
  to: string;
  year: number;
  month: number;
  day: number | null;
  institute: string;
  data: Record<PartyAbbreviation, number>;
}

export interface Polls {
  [year: number]: Record<number, Array<Poll>>;
}
