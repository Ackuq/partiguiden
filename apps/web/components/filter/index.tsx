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
    <div aria-expanded={drawerVisible} className="group">
      <div
        onClick={closeDrawer}
        className={twMerge(
          "fixed left-0 top-0 z-50 hidden h-full w-full backdrop-blur-md",
          "group-aria-expanded:block group-aria-expanded:backdrop-blur-md",
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
          "w-drawer translate-x-drawer fixed right-0 pt-12 group-aria-expanded:translate-x-0",
          // Desktop styles, disable when drawer-visible=true in order to correctly render the site when resized.
          "group-aria-[expanded=false]:sm:top-header-sm-with-margin group-aria-[expanded=false]:sm:max-h-full-without-header",
          "group-aria-[expanded=false]:sm:sticky group-aria-[expanded=false]:sm:transform-none",
          "group-aria-[expanded=false]:sm:z-0 group-aria-[expanded=false]:sm:h-min group-aria-[expanded=false]:sm:w-auto",
          "group-aria-[expanded=false]:sm:min-w-[17rem] group-aria-[expanded=false]:sm:rounded-sm group-aria-[expanded=false]:sm:pt-0",
          "sm:transition-none",
        )}
      >
        <button
          onClick={closeDrawer}
          aria-label="Stäng filtermeny"
          className={twMerge(
            "absolute right-4 top-4",
            "group-aria-[expanded=false]:sm:hidden",
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
