import type { Committee } from "@lib/committees";
import type { Party } from "@partiguiden/party-data/types";

import type { MemberParty } from "../parliament/types";

/**
 * List response
 */

export interface DebateListResponse {
  pages: number;
  debates: DebateListEntry[];
}

export interface DebateListEntry {
  id: string;
  title: string;
  subtitle: string;
  type?: string;
  committee?: Committee;
  sender?: Speaker;
  date: string;
}

/**
 * Single entry response
 */

export interface Debate {
  id: string;
  title: string;
  subtitle: string;
  type?: string;
  date: string;
  webTVUrl: string;
  senderId?: string;
  speakers: Record<string, Speaker>;
  statements: DebateStatement[];
}

/**
 * Common types
 */

export interface Speaker {
  id: string;
  firstName: string;
  lastName: string;
  party: Party | "-";
  imageUrl: string;
}

export interface Speech {
  party: MemberParty;
  speaker: string;
  speakerId: string;
  text: string;
}

export type DebateStatement = Speech & {
  number: string;
  date: string;
};
