import dynamic from 'next/dynamic';

export default dynamic(() => import('./BlockStatistics'), { ssr: false });
