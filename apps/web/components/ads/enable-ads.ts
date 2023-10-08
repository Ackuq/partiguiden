import { ADSENSE_CLIENT_ID } from "@lib/constants";

export default function enableAds(): boolean {
  return (
    typeof window !== "undefined" &&
    window.location.hostname.includes("partiguiden.") &&
    !!ADSENSE_CLIENT_ID
  );
}
