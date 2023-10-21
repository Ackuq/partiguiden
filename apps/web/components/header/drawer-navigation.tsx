"use client";

import { XMarkIcon } from "@heroicons/react/24/solid";
import { mainNavigation } from "@lib/navigation";
import { useContext, useEffect } from "react";
import DrawerEntry from "./drawer-entry";
import { twMerge } from "tailwind-merge";
import { DrawerContext } from "./drawer-context";

export default function DrawerNavigation() {
  const { closeDrawer, drawerIsOpen } = useContext(DrawerContext);

  useEffect(() => {
    if (drawerIsOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [drawerIsOpen]);

  return (
    <div className="group text-slate-50" aria-hidden={!drawerIsOpen}>
      <div
        aria-hidden="true"
        onClick={closeDrawer}
        className={twMerge(
          "fixed left-0 top-0 z-50 hidden h-full w-full backdrop-blur-md",
          "group-aria-visible:block group-aria-visible:backdrop-blur-md",
        )}
      />
      <div
        aria-modal
        className={twMerge(
          "bg-primary w-drawer fixed right-0 top-0 z-50 h-full overflow-y-scroll dark:bg-slate-800",
          "translate-x-drawer group-aria-visible:translate-x-0 transition-transform",
          "motion-reduce:transition-none",
        )}
      >
        <button
          onClick={closeDrawer}
          aria-label="Stäng meny"
          className="absolute right-4 top-4"
        >
          <XMarkIcon className="text-red h-8 w-8" />
        </button>
        <nav className="flex flex-col gap-3 pt-12">
          {mainNavigation.map((item) => (
            <DrawerEntry key={item.title} item={item} />
          ))}
        </nav>
      </div>
    </div>
  );
}
