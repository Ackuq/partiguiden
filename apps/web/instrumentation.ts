/* global process */
import * as Sentry from "@sentry/nextjs";

const SENTRY_DSN = process.env.SENTRY_DSN ?? process.env.NEXT_PUBLIC_SENTRY_DSN;

export function register() {
  Sentry.init({
    dsn:
      SENTRY_DSN ??
      "https://77574d29964f42f8927a00bb6e6e53bf@o499663.ingest.sentry.io/5578670",
    tracesSampleRate: 0.05,
    environment: process.env.NEXT_PUBLIC_VERCEL_ENV,
  });
}
