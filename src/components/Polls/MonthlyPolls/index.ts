import dynamic from 'next/dynamic';

export default dynamic(() => import('./MonthlyPolls'), { ssr: false });
