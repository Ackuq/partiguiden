import React, { useEffect } from 'react';
import enableAds from './enableAds';

const Ad: React.FC = () => {
  useEffect(() => {
    if (enableAds) {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    }
  }, []);

  return enableAds ? (
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
