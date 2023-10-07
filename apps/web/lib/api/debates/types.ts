import type { Party } from "@partiguiden/party-data/types";
import type { MemberResponse } from "../member/types";
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

export interface DebateListEntry {
  title: string;
  committee?: Committee;
  subtitle: string;
  id: string;
  session: string;
  denomination: string;
  paragraph: string;
  paragraphTitle: string;
  textUrl: string;
  webTVIds: string[];
  debate: Debate[];
  debateName: string;
  sender?: MemberResponse;
  date: string;
  systemDate: string;
}

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

export type DebateEntry = Omit<DebateListEntry, "debate"> & {
  protocolId?: string;
  speakers: Record<string, MemberResponse>;
  statements: DebateStatement[];
};
