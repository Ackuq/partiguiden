import createCache, { EmotionCache } from '@emotion/cache';

const getCache = (): EmotionCache => {
  const cache = createCache({ key: 'css', prepend: true });
  cache.compat = true;
  return cache;
};

export default getCache;
