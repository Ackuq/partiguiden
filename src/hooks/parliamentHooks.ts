import useSWR from 'swr';
import { ParsedUrlQuery, stringify } from 'querystring';
import { Vote, VoteList } from '../types/voting';
import { Decisions } from '../types/decision';
import { Member, MemberDocuments } from '../types/member';
import { DocumentResponse } from '../types/document';

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export const useDecisions = (query: ParsedUrlQuery): Decisions | undefined => {
  const { data } = useSWR<Decisions>(`/api/decisions?${stringify(query)}`, fetcher);
  return data;
};

export const useMember = (id: string): Member | undefined => {
  const { data } = useSWR<Member>(`/api/member/${id}`, fetcher);
  return data;
};

export const useVote = (id: string, proposition: number): Vote | undefined => {
  const { data } = useSWR<Vote>(`/api/vote/${id}/${proposition}`, fetcher);
  return data;
};

export const useVotes = (query: ParsedUrlQuery): VoteList | undefined => {
  const { data } = useSWR<VoteList>(`/api/vote?${stringify(query)}`, fetcher);
  return data;
};

export const useMemberDocuments = (id: string, page: number): MemberDocuments | undefined => {
  const { data } = useSWR<MemberDocuments>(`/api/member/${id}/documents?page=${page}`, fetcher);
  return data;
};

export const useDocument = (id: string): DocumentResponse | undefined => {
  const { data } = useSWR<DocumentResponse>(`/api/document/${id}/json`, fetcher);
  return data;
};
