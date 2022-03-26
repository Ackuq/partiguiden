import { MemberResponse } from './member';
import { PartyAbbreviation } from '../utils/parties';

export interface Debate {
  party: PartyAbbreviation;
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
  party: PartyAbbreviation;
}

export interface DebateListEntry {
  title: string;
  authority: string;
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
  participants?: {
    sender?: Participant;
    answerer?: Participant;
    recipient?: Participant;
  };
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

export type DebateEntry = Omit<DebateListEntry, 'debate'> & {
  protocolId: string;
  speakers: Record<string, MemberResponse>;
  statements: DebateStatement[];
};
