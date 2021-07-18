import React from 'react';
import Script from 'next/script';
import enableAds, { adClientID } from './enableAds';

const Ad: React.FC = () => {
  return enableAds ? (
    <>
      <Script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js" />
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-format="fluid"
        data-ad-layout-key="-fb+5w+4e-db+86"
        data-ad-client={adClientID}
        data-ad-slot={process.env.FLOW_AD_SLOT}
      />
      <Script
        dangerouslySetInnerHTML={{
          __html: `(adsbygoogle = window.adsbygoogle || []).push({});`,
        }}
      />
    </>
  ) : (
    <></>
  );
};

export default Ad;
