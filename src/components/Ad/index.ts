import dynamic from 'next/dynamic';
import ResponsiveAd from './ResponsiveAd';

declare global {
  interface Window {
    adsbygoogle: Array<unknown>;
  }
}

const FlowAd = dynamic(() => import('./FlowAd'), {
  ssr: false,
});

export { FlowAd, ResponsiveAd };
