"use client";

import dynamic from "next/dynamic";

import LoadingFlowAd from "@components/loading/flow-ad";
import LoadingResponsiveAd from "@components/loading/responsive-ad";

export const FlowAd = dynamic(() => import("./flow-ad"), {
  ssr: false,
  loading: LoadingFlowAd,
});

export const ResponsiveAd = dynamic(() => import("./responsive-ad"), {
  ssr: false,
  loading: LoadingResponsiveAd,
});
