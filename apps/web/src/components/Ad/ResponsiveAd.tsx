import React, { useEffect } from "react";

import { ADSENSE_CLIENT_ID, RESPONSIVE_AD_SLOT_ID } from "../../lib/adsense";

import enableAds from "./enableAds";

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

  return (
    <div>
      {enableAds() ? (
        <ins
          className="adsbygoogle"
          style={{ display: "block" }}
          data-ad-client={ADSENSE_CLIENT_ID}
          data-ad-slot={RESPONSIVE_AD_SLOT_ID}
          data-ad-format="horizontal"
          data-full-width-responsive="true"
        />
      ) : (
        <div
          style={{
            padding: 20,
            border: "1px solid #ccc",
          }}
        >
          Placeholder ad
        </div>
      )}
    </div>
  );
};

export default Ad;
