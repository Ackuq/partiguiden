import type { Party } from "@partiguiden/party-data/types";
import type { Committee } from "@lib/committes";

export interface Debate {
  party: Party | "-";
  parentId: string;
  thumbnail: string;
  thumbnailLarge: string;
  id: string;
  thumbnailUrl: string;
  number: string;
  dateTime: string;
  time: string;
  seconds: string;
  speaker: string;
  videoUrl: string;
  personId: string;
  text: string;
}

export interface Participant {
  id: string;
  name: string;
  party: Party | "-";
}

export type Speaker = {
  id: string;
  firstName: string;
  lastName: string;
  party: Party | "-";
  imageUrl: string;
};

export interface DebateListEntry {
  id: string;
  title: string;
  subtitle: string;
  type?: string;
  committee?: Committee;
  sender?: Speaker;
  date: string;
}

export type DebateEntry = {
  id: string;
  title: string;
  subtitle: string;
  type: string;
  date: string;
  webTVUrl: string;
  speakers: {
    [id: string]: Speaker;
  };
  statements: DebateStatement[];
};

export interface DebateListResponse {
  pages: number;
  debates: DebateListEntry[];
}

export interface Speech {
  speaker: string;
  speakerId: string;
  text: string;
  number: string;
  date: string;
}

export type DebateStatement = Debate & { speech: Speech };
