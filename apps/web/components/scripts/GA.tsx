import { GoogleAnalytics } from "@next/third-parties/google";

import { GA_TRACKING_ID } from "@lib/constants";

export function GA() {
  if (!GA_TRACKING_ID) {
    return;
  }
  return <GoogleAnalytics gaId={GA_TRACKING_ID} />;
}
