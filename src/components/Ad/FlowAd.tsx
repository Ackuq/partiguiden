import React, { useEffect } from 'react';
import enableAds, { adClientID } from './enableAds';

const Ad: React.FC = () => {
  useEffect(() => {
    if (enableAds()) {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    }
  }, []);

  return (
    <>
      {enableAds() && (
        <ins
          className="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-format="fluid"
          data-ad-layout-key="-fb+5w+4e-db+86"
          data-ad-client={adClientID}
          data-ad-slot={process.env.FLOW_AD_SLOT}
        />
      )}
    </>
  );
};

export default Ad;
