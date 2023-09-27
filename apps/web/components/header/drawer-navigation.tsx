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
    <div
      className={"text-font-primary group"}
      data-show={drawerIsOpen}
      aria-hidden={!drawerIsOpen}
    >
      <div
        onClick={closeDrawer}
        className={twMerge(
          "fixed left-0 top-0 z-50 hidden h-full w-full backdrop-blur-md",
          "group-data-[show=true]:block group-data-[show=true]:backdrop-blur-md",
        )}
      />
      <div
        className={twMerge(
          "bg-primary dark:bg-background-elevated-dark fixed right-0 top-0 z-50 h-full w-[18rem] overflow-y-scroll",
          "translate-x-[18rem] transition-transform group-data-[show=true]:translate-x-0",
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
