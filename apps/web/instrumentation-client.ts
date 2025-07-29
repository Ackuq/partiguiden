import * as Sentry from "@sentry/nextjs";

const SENTRY_DSN = process.env.SENTRY_DSN ?? process.env.NEXT_PUBLIC_SENTRY_DSN;

Sentry.init({
  dsn: SENTRY_DSN,
  tracesSampleRate: 0.05,
  environment: process.env.NEXT_PUBLIC_VERCEL_ENV,
});

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
