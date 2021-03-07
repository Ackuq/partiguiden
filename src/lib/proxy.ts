import { Member } from '../types/member';
import { PartyData } from '../types/party';

const baseUrl = process.env.PROXY_URL;

export const getParty = (party: string): Promise<PartyData> =>
  fetch(`${baseUrl}/swe/party/${party}`).then((res) => res.json());

export const getMember = (id: string): Promise<Member> =>
  fetch(`${baseUrl}/swe/member/${id}`).then((res) => res.json());

export const getMembers = (): Promise<Array<Member>> =>
  fetch(`${baseUrl}/swe/members`).then((res) => res.json());
