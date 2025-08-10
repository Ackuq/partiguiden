import type { Blocks } from "@lib/utils/blocks";
import type { Party } from "@partiguiden/party-data/types";

export interface Poll {
  publishedDate: Date;
  institute: string;
  data: Partial<Record<Party, number>>;
}

export type Polls = Record<number, Record<number, Poll[]>>;

export interface PollDetails {
  value: number;
  institute: string;
  publishedDate: Date;
}

export type AveragePoll = {
  party: Party;
  name: string;
  value: number;
  details: PollDetails[];
}[];

export type MonthlyAverage = ({ date: string } & Record<Party, string>)[];

export type BlockAverage = {
  name: Blocks["values"][number]["name"];
  data: number;
}[];

export type BlocksAverage = [BlockAverage, BlockAverage];
