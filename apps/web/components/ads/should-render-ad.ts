export default function shouldRenderAd() {
  return (
    process.env.NODE_ENV === "production" &&
    (process.env.VERCEL_ENV === "production" ||
      process.env.VERCEL_ENV === "preview")
  );
}
