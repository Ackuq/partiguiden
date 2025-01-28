"use client";

import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { useState } from "react";

type AccordionProps = React.PropsWithChildren<{
  title: string;
}>;

export default function Accordion({ children, title }: AccordionProps) {
  const [visible, setVisible] = useState(false);

  function toggleVisible() {
    setVisible((prevState) => !prevState);
  }

  return (
    <div>
      <button
        onClick={toggleVisible}
        aria-expanded={visible}
        className="group flex w-full items-center justify-between rounded-sm bg-slate-100 px-4 py-3 text-xl dark:bg-slate-700 sm:text-2xl"
      >
        <span>{title}</span>
        <ChevronDownIcon className="inline h-6 w-6 transition-transform group-aria-expanded:rotate-180" />
      </button>
      <div aria-hidden={!visible} className="mt-4 aria-hidden:hidden">
        {children}
      </div>
    </div>
  );
}
