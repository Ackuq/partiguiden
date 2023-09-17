import { ADSENSE_CLIENT_ID } from "../../lib/adsense";

const enableAds = (): boolean =>
  typeof window !== "undefined" &&
  window.location.hostname.includes("partiguiden.") &&
  !!ADSENSE_CLIENT_ID;

export default enableAds;
