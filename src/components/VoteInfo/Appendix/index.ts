import dynamic from 'next/dynamic';

export default dynamic(() => import('./Appendix'), { ssr: true });
