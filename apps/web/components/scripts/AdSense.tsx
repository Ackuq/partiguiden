import Script from "next/script";

import { ADSENSE_CLIENT_ID } from "@lib/constants";

export function AdSense() {
  if (!ADSENSE_CLIENT_ID || process.env.NODE_ENV !== "production") {
    return null;
  }

  return (
    <Script
      id="ads-init"
      async
      strategy="afterInteractive"
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT_ID}`}
      crossOrigin="anonymous"
    />
  );
}
