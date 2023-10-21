import type { Committee } from "@lib/committees";
import type { Party } from "@partiguiden/party-data/types";

import type { MemberParty } from "../parliament/types";

/**
 * List response
 */

export type DebateListResponse = {
  pages: number;
  debates: DebateListEntry[];
};

export type DebateListEntry = {
  id: string;
  title: string;
  subtitle: string;
  type?: string;
  committee?: Committee;
  sender?: Speaker;
  date: string;
};

/**
 * Single entry response
 */

export type Debate = {
  id: string;
  title: string;
  subtitle: string;
  type?: string;
  date: string;
  webTVUrl: string;
  senderId?: string;
  speakers: {
    [id: string]: Speaker;
  };
  statements: DebateStatement[];
};

/**
 * Common types
 */

export type Speaker = {
  id: string;
  firstName: string;
  lastName: string;
  party: Party | "-";
  imageUrl: string;
};

export type Speech = {
  party: MemberParty;
  speaker: string;
  speakerId: string;
  text: string;
};

export type DebateStatement = Speech & {
  number: string;
  date: string;
};
