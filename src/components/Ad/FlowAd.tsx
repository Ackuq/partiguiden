import React, { useEffect } from 'react';

declare global {
  interface Window {
    adsbygoogle: Array<any>;
  }
}

const enableAd = process.env.NODE_ENV === 'production' && process.env.ENABLE_ADS === 'true';

const Ad: React.FC = () => {
  useEffect(() => {
    if (enableAd) {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    }
  }, []);

  return enableAd ? (
    <ins
      className="adsbygoogle"
      style={{ display: 'block' }}
      data-ad-format="fluid"
      data-ad-layout-key="-fb+5w+4e-db+86"
      data-ad-client="ca-pub-3248338512924345"
      data-ad-slot="7770046442"
    />
  ) : (
    <></>
  );
};

export default Ad;
