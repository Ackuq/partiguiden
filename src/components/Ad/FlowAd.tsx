import React, { useEffect } from 'react';
import enableAds, { adClientID } from './enableAds';

const Ad: React.FC = () => {
  useEffect(() => {
    if (enableAds()) {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    }
  }, []);

  // Flow ads need at least 250px of width to render
  return (
    <div style={{ minWidth: 250 }}>
      {enableAds() ? (
        <ins
          className="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-format="fluid"
          data-ad-layout-key="-fb+5w+4e-db+86"
          data-ad-client={adClientID}
          data-ad-slot={process.env.FLOW_AD_SLOT}
        />
      ) : (
        <div
          style={{
            padding: 20,
            border: '1px solid #ccc',
          }}
        >
          Placeholder ad
        </div>
      )}
    </div>
  );
};

export default Ad;
