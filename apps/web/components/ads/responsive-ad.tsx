"use client";
import { ADSENSE_CLIENT_ID, RESPONSIVE_AD_SLOT_ID } from "@lib/constants";
import useAds from "./use-ads";
import shouldRenderAd from "./should-render-ad";

export default function ResponsiveAd() {
  useAds();

  return (
    <div
      // @ts-expect-error This is explicitly checked by the google ad
      align="center"
      className="[&:has(ins[data-ad-status='unfilled'])]:hidden"
    >
      {shouldRenderAd() ? (
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
