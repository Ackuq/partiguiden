export interface Polls {
  [year: number]: Record<
    number,
    Array<{
      from: string;
      to: string;
      institute: string;
      data: Record<partyAbbrev, number>;
    }>
  >;
}
