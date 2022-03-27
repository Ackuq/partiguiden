import React, { useEffect } from 'react';
import enableAds, { adClientID } from './enableAds';

const Ad: React.FC = () => {
  useEffect(() => {
    if (enableAds()) {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (error) {
        // Ignore error
      }
    }
  }, []);

  // Flow ads need at least 250px of width to render
  return (
    <>
      {enableAds() ? (
        <ins
          className="adsbygoogle"
          style={{ display: 'block', width: '100%' }}
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
    </>
  );
};

export default Ad;
