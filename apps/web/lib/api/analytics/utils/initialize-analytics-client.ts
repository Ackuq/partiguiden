import { BetaAnalyticsDataClient } from "@google-analytics/data";

const SERVICE_ACCOUNT = process.env.GA4_SERVICE_ACCOUNT;

export default function initializeAnalyticsClient() {
  if (!SERVICE_ACCOUNT) {
    console.warn("GA4 Service account not set");
    return;
  }

  const buffer = Buffer.from(SERVICE_ACCOUNT, "base64");
  const credentials = JSON.parse(buffer.toString("utf-8"));

  return new BetaAnalyticsDataClient({
    credentials,
  });
}
