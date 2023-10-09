"use client";

import { twMerge } from "tailwind-merge";
import SearchFilter from "./search";
import SearchToggles from "./toggles";
import { useEffect, useState } from "react";
import {
  AdjustmentsHorizontalIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";

export default function Filter() {
  const [drawerVisible, setDrawerVisible] = useState(false);

  useEffect(() => {
    if (drawerVisible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [drawerVisible]);

  function openDrawer() {
    setDrawerVisible(true);
  }

  function closeDrawer() {
    setDrawerVisible(false);
  }

  return (
    <div aria-hidden={!drawerVisible} className="group">
      <div
        onClick={closeDrawer}
        className={twMerge(
          "fixed left-0 top-0 z-50 hidden h-full w-full backdrop-blur-md",
          "group-aria-visible:block group-aria-visible:backdrop-blur-md",
        )}
      />
      <button
        onClick={openDrawer}
        className={twMerge(
          "bg-background-light dark:bg-background-elevated-dark fixed bottom-4 right-4 z-50 rounded-full p-4 shadow-md",
          "sm:hidden",
        )}
      >
        <AdjustmentsHorizontalIcon className="h-10 w-10" />
      </button>
      <div
        className={twMerge(
          "top-0 z-50 h-screen overflow-y-scroll shadow-sm",
          "dark:bg-background-elevated-dark bg-white transition-transform",
          "w-drawer translate-x-drawer group-aria-visible:translate-x-0 fixed right-0 pt-12",
          // Desktop styles, disable when drawer-visible=true in order to correctly render the site when resized.
          "group-aria-hidden:sm:top-header-sm-with-margin group-aria-hidden:sm:max-h-full-without-header",
          "group-aria-hidden:sm:sticky group-aria-hidden:sm:transform-none",
          "group-aria-hidden:sm:z-0 group-aria-hidden:sm:h-min group-aria-hidden:sm:w-auto",
          "group-aria-hidden:sm:min-w-[17rem] group-aria-hidden:sm:rounded-sm group-aria-hidden:sm:pt-0",
          "sm:transition-none",
        )}
      >
        <button
          onClick={closeDrawer}
          aria-label="Stäng filtermeny"
          className={twMerge(
            "absolute right-4 top-4",
            "group-aria-hidden:sm:hidden",
          )}
        >
          <XMarkIcon className="text-red h-8 w-8" />
        </button>
        <SearchFilter />
        <SearchToggles />
      </div>
    </div>
  );
}
