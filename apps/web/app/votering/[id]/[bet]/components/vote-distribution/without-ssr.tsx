"use client";

import dynamic from "next/dynamic";

const VoteDistribution = dynamic(() => import("./vote-distribution"), {
  ssr: false,
});

export default VoteDistribution;
