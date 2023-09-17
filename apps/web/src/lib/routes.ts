export const INDEX = "/";
export const COOKIE_POLICY = "/cookie-policy";
export const ABOUT_US = "/about-us";
export const POLLS = "/polls";

export const VOTES = "/vote";
export const VOTE = "/vote/[id]/[bet]";
export const getVoteHref = (id: string, bet: number): string =>
  `/vote/${id}/${bet}`;

export const DECISIONS = "/decisions";

export const STANDPOINTS = "/standpoints";
export const STANDPOINT = "/standpoints/[id]";
export const getStandpointHref = (id: number): string => `/standpoints/${id}`;

export const PARTY = "/party/[party]";
export const getPartyHref = (party: string): string => `/party/${party}`;

export const MEMBERS = `/member`;
export const MEMBER = `/member/[id]`;
export const getMemberHref = (id: string): string => `/member/${id}`;

export const MEMBER_STATS_YEAR = `/member-statistics-year`;
export const MEMBER_STATS_PERIOD = `/member-statistics-period`;

export const DOCUMENT = "/document/[id]";
export const getDocumentHref = (id: string): string => `/document/${id}`;

export const DEBATES = "/debate";
export const DEBATE = "/debate/[id]";
export const getDebateHref = (id: string): string => `/debate/${id}`;
