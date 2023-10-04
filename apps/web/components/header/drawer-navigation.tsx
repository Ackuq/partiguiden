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
    <div className="text-font-primary group" aria-expanded={drawerIsOpen}>
      <div
        onClick={closeDrawer}
        className={twMerge(
          "fixed left-0 top-0 z-50 hidden h-full w-full backdrop-blur-md",
          "group-aria-expanded:block group-aria-expanded:backdrop-blur-md",
        )}
      />
      <div
        className={twMerge(
          "bg-primary dark:bg-background-elevated-dark w-drawer fixed right-0 top-0 z-50 h-full overflow-y-scroll",
          "translate-x-drawer transition-transform group-aria-expanded:translate-x-0",
          "motion-reduce:transition-none",
        )}
      >
        <button onClick={closeDrawer} className="absolute right-4 top-4">
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
