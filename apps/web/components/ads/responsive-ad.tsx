"use client";
import { ADSENSE_CLIENT_ID, RESPONSIVE_AD_SLOT_ID } from "@lib/constants";
import useAds from "./use-ads";
import shouldRenderAd from "./should-render-ad";

interface Props {
  className?: string;
}

export default function ResponsiveAd({ className }: Props) {
  useAds();

  return (
    <div className={className}>
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
