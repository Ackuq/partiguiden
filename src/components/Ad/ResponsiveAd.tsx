import React, { useEffect } from 'react';
import enableAds, { adClientID } from './enableAds';

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
        data-ad-client={adClientID}
        data-ad-slot={process.env.RESPONSIVE_AD_SLOT}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  ) : (
    <></>
  );
};

export default Ad;
