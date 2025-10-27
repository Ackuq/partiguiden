"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

import Loading from "@components/common/loading";
import type { TwitterResult } from "@lib/api/wikidata/types";

interface Props {
  twitterFeed?: TwitterResult;
}

export default function TwitterFeed({ twitterFeed }: Props) {
  const theme = useTheme();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const twitterHandle = twitterFeed?.twitterHandle.value;
    if (twitterHandle) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLoading(true);
      const container = document.getElementById("twitterContainer");
      if (container) {
        container.innerHTML = "";
      }
      void window.twttr.widgets
        ?.createTimeline(
          {
            sourceType: "profile",
            screenName: twitterHandle,
          },
          container,
          {
            theme: theme.theme as "light" | "dark",
            chrome: "nofooter noborders",
          },
        )
        .then(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [theme.theme, twitterFeed?.twitterHandle.value]);

  const twitterHandle = twitterFeed?.twitterHandle.value;

  if (!twitterHandle) {
    return (
      <div className="m-4">
        <p className="text-center text-lg">Inget Twitterkonto hittades.</p>
      </div>
    );
  }

  return (
    <>
      <div
        id="twitterContainer"
        className="mx-auto my-4 max-w-[500px] bg-black"
      />
      {loading && <Loading className="mx-auto my-8" />}
    </>
  );
}
