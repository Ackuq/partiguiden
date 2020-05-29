import dynamic from 'next/dynamic';

const FlowAd = dynamic<{}>(() => import('./FlowAd'), {
  ssr: false,
});

const ResponsiveAd = dynamic<{}>(() => import('./ResponsiveAd'), {
  ssr: false,
});

export { FlowAd, ResponsiveAd };
