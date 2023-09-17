import dynamic from "next/dynamic";

declare global {
  interface Window {
    adsbygoogle: Array<unknown>;
  }
}

const FlowAd = dynamic(() => import("./FlowAd"), {
  ssr: false,
});

const ResponsiveAd = dynamic(() => import("./ResponsiveAd"), {
  ssr: false,
});

export { FlowAd, ResponsiveAd };
