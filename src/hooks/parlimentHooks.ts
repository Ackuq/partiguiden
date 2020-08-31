import useSWR from 'swr';
import { ParsedUrlQuery, stringify } from 'querystring';
import { VoteListEntry } from '../types/voting';
import { Decision } from '../types/decision';
import { MemberDocuments } from '../types/member';

const baseUrl = process.env.PROXY_URL || 'http://localhost:3002';

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export interface Decisions {
  pages: number;
  decisions: Array<Decision>;
}

export const useDecisions = (query: ParsedUrlQuery): Decisions | undefined => {
  const { data } = useSWR<Decisions>(`${baseUrl}/swe/decisions?${stringify(query)}`, fetcher);

  return data;
};

interface Votes {
  pages: number;
  votes: Array<VoteListEntry>;
}

export const useVotes = (query: ParsedUrlQuery): Votes | undefined => {
  const { data } = useSWR<Votes>(`${baseUrl}/swe/votes?${stringify(query)}`, fetcher);

  return data;
};

export const useMemberDocuments = (id: string, page: number): MemberDocuments | undefined => {
  const { data } = useSWR<MemberDocuments>(
    `${baseUrl}/swe/member/${id}/documents?page=${page}`,
    fetcher
  );

  return data;
};
