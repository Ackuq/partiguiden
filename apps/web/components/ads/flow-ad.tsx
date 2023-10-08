"use client";

import { useEffect } from "react";
import { ADSENSE_CLIENT_ID, FLOW_AD_SLOT_ID } from "@lib/constants";
import enableAds from "./enable-ads";

export default function FlowAd() {
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
    // @ts-expect-error This is explicitly checked by the google ad
    <div align="center">
      {enableAds() ? (
        <ins
          className="adsbygoogle"
          style={{ display: "block", width: "100%" }}
          data-ad-format="fluid"
          data-ad-layout-key="-fb+5w+4e-db+86"
          data-ad-client={ADSENSE_CLIENT_ID}
          data-ad-slot={FLOW_AD_SLOT_ID}
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
}
