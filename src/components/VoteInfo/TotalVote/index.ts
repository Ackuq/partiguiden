import dynamic from 'next/dynamic';

export default dynamic(() => import('./TotalVote'), { ssr: false });
