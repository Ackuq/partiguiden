"use client";

import dynamic from "next/dynamic";

const BlockBuilder = dynamic(() => import("./block-builder"), {
  ssr: false,
  loading: BlockBuilderLoading,
});

function BlockBuilderLoading() {
  return (
    <div
      role="status"
      className="h-[43rem] w-full animate-pulse bg-slate-200 dark:bg-slate-900"
    />
  );
}

export default BlockBuilder;
