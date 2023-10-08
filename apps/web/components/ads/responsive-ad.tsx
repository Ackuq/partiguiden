"use client";

import { useEffect } from "react";
import enableAds from "./enable-ads";
import { ADSENSE_CLIENT_ID, RESPONSIVE_AD_SLOT_ID } from "@lib/constants";

interface Props {
  className?: string;
}

export default function ResponsiveAd({ className }: Props) {
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
    <div className={className}>
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
}
