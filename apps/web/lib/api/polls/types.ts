import type { Blocks } from "@lib/utils/blocks";
import type { Party } from "@partiguiden/party-data/types";

export type Poll = {
  publishedDate: Date;
  institute: string;
  data: {
    [party in Party]?: number;
  };
};

export type Polls = {
  [year: number]: { [month: number]: Poll[] };
};

export type PollDetails = {
  value: number;
  institute: string;
  publishedDate: Date;
};

export type AveragePoll = {
  party: Party;
  value: number;
  details: PollDetails[];
}[];

export type MonthlyAverage = ({ date: string } & {
  [party in Party]: string;
})[];

export type BlockAverage = {
  name: Blocks["values"][number]["name"];
  value: number;
}[];

export type BlocksAverage = [BlockAverage, BlockAverage];
