import dynamic from 'next/dynamic';

export default dynamic(() => import('./CookieBanner'), { ssr: false });
