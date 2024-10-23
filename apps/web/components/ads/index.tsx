"use client";

import dynamic from "next/dynamic";

export const FlowAd = dynamic(() => import("./flow-ad"), {
  ssr: false,
  loading: LoadingFlowAd,
});

export const ResponsiveAd = dynamic(() => import("./responsive-ad"), {
  ssr: false,
  loading: LoadingResponsiveAd,
});

function LoadingFlowAd() {
  return (
    <div
      role="status"
      className="h-[150px] animate-pulse bg-slate-200 dark:bg-slate-900 lg:h-[250px]"
    />
  );
}

function LoadingResponsiveAd() {
  return (
    <div
      role="status"
      className="h-40 animate-pulse bg-slate-200 dark:bg-slate-900 sm:h-[100px]"
    />
  );
}
