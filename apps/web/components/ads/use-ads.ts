"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";

import { ADSENSE_CLIENT_ID } from "@lib/constants";

function enableAds(): boolean {
  return (
    typeof window !== "undefined" &&
    window.location.hostname.includes("partiguiden.") &&
    !!ADSENSE_CLIENT_ID
  );
}

export default function useAds() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!enableAds()) {
      return;
    }
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      // Ignore error
    }
  }, [pathname, searchParams]);
}
