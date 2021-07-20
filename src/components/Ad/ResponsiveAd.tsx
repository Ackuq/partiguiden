import React, { useEffect } from 'react';
import enableAds, { adClientID } from './enableAds';

const Ad: React.FC = () => {
  useEffect(() => {
    if (enableAds()) {
      if (typeof window !== 'undefined') {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    }
  }, []);

  return (
    <div style={{ textAlign: 'center' }}>
      {enableAds() && (
        <ins
          className="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-client={adClientID}
          data-ad-slot={process.env.RESPONSIVE_AD_SLOT}
          data-ad-format="horizontal"
          data-full-width-responsive="true"
        />
      )}
    </div>
  );
};

export default Ad;
