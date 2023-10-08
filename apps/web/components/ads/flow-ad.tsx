"use client";

import { ADSENSE_CLIENT_ID, FLOW_AD_SLOT_ID } from "@lib/constants";
import useAds from "./use-ads";
import shouldRenderAd from "./should-render-ad";

export default function FlowAd() {
  useAds();

  // Flow ads need at least 250px of width to render
  return (
    <div
      // @ts-expect-error This is explicitly checked by the google ad
      align="center"
      className="[&:has(ins[data-ad-status='unfilled'])]:hidden"
    >
      {shouldRenderAd() ? (
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
