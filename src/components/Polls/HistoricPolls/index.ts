import dynamic from 'next/dynamic';

export default dynamic(() => import('./HistoricPolls'), { ssr: false });
