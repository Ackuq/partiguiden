import React, { useEffect } from 'react';
import enableAds, { adClientID } from './enableAds';

const Ad: React.FC = () => {
  useEffect(() => {
    if (enableAds()) {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    }
  }, []);

  return (
    <div>
      {enableAds() ? (
        <ins
          className="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-client={adClientID}
          data-ad-slot={process.env.RESPONSIVE_AD_SLOT}
          data-ad-format="horizontal"
          data-full-width-responsive="true"
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
