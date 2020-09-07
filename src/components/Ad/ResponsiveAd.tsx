import React, { useEffect } from 'react';
import enableAds from './enableAds';

const Ad: React.FC = () => {
  useEffect(() => {
    if (enableAds) {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    }
  }, []);

  return enableAds ? (
    <div style={{ textAlign: 'center' }}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-3248338512924345"
        data-ad-slot="6515707043"
        data-ad-format="horizontal"
        data-full-width-responsive="true"
      />
    </div>
  ) : (
    <></>
  );
};

export default Ad;
