import dynamic from 'next/dynamic';

export const Information = dynamic(() => import('./Information'));
export const ProfilePicture = dynamic(() => import('./ProfilePicture'));
