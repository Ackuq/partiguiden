import { BetaAnalyticsDataClient } from "@google-analytics/data";

const SERVICE_ACCOUNT_PRIVATE_KEY = process.env.GA4_SERVICE_ACCOUNT_PRIVATE_KEY;
const SERVICE_ACCOUNT_CLIENT_EMAIL =
  process.env.GA4_SERVICE_ACCOUNT_CLIENT_EMAIL;

export default function initializeAnalyticsClient() {
  if (!SERVICE_ACCOUNT_PRIVATE_KEY || !SERVICE_ACCOUNT_CLIENT_EMAIL) {
    console.warn("GA4 Service account not set");
    return;
  }
  return new BetaAnalyticsDataClient({
    credentials: {
      client_email: SERVICE_ACCOUNT_CLIENT_EMAIL,
      private_key: SERVICE_ACCOUNT_PRIVATE_KEY,
    },
  });
}
