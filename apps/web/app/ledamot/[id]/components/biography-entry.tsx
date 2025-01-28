"use client";

import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { useState } from "react";

import type { Information } from "@lib/api/member/types";

interface Props {
  information: Information;
}

export default function BiographyEntry({ information }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  function toggleEntry() {
    setIsOpen((prevState) => !prevState);
  }

  return (
    <button
      className="group w-full border-t-2 border-slate-300 text-left dark:border-slate-600"
      onClick={toggleEntry}
      aria-expanded={isOpen}
    >
      <div className="flex items-center justify-between p-4">
        {information.code}
        <ChevronDownIcon className="h-4 w-4 transition-transform group-aria-expanded:rotate-180" />
      </div>
      <p className="px-4 pb-6 pt-2 group-aria-[expanded=false]:hidden">
        {information.content}
      </p>
    </button>
  );
}
