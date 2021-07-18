import React from 'react';
import Script from 'next/script';
import enableAds, { adClientID } from './enableAds';

const Ad: React.FC = () => {
  return enableAds ? (
    <div style={{ textAlign: 'center' }}>
      <Script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js" />
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={adClientID}
        data-ad-slot={process.env.RESPONSIVE_AD_SLOT}
        data-ad-format="horizontal"
        data-full-width-responsive="true"
      />
      <Script
        dangerouslySetInnerHTML={{
          __html: `(adsbygoogle = window.adsbygoogle || []).push({});`,
        }}
      />
    </div>
  ) : (
    <></>
  );
};

export default Ad;
