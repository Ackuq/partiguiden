import dynamic from 'next/dynamic';

const NoSSRAd = dynamic<{}>(() => import('./Ad').then((ad) => ad.default), {
  ssr: false,
});

export default NoSSRAd;
