import dynamic from 'next/dynamic';

export const MembersFilter = dynamic(() => import('./FilterMembers'));
export const Member = dynamic(() => import('./Member'));
export const MemberList = dynamic(() => import('./MemberList'));
