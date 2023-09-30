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
    <div data-drawer-visible={drawerVisible} className="group">
      <div
        onClick={closeDrawer}
        className={twMerge(
          "fixed left-0 top-0 z-50 hidden h-full w-full backdrop-blur-md",
          "group-data-[drawer-visible=true]:block group-data-[drawer-visible=true]:backdrop-blur-md",
        )}
      />
      <button
        onClick={openDrawer}
        className={twMerge(
          "bg-background-light dark:bg-background-elevated-dark fixed bottom-4 right-4 z-50 rounded-full p-2 shadow-md",
          "sm:hidden",
        )}
      >
        <AdjustmentsHorizontalIcon className="h-12 w-12" />
      </button>
      <div
        className={twMerge(
          "top-0 z-50 h-screen overflow-y-scroll shadow-sm",
          "dark:bg-background-elevated-dark bg-white transition-transform",
          "w-drawer translate-x-drawer fixed right-0 pt-12 group-data-[drawer-visible=true]:translate-x-0",
          // Desktop styles, disable when drawer-visible=true in order to correctly render the site when resized.
          "group-data-[drawer-visible=false]:sm:top-header-sm-with-margin group-data-[drawer-visible=false]:sm:max-h-full-without-header",
          "group-data-[drawer-visible=false]:sm:sticky group-data-[drawer-visible=false]:sm:transform-none",
          "group-data-[drawer-visible=false]:sm:z-0 group-data-[drawer-visible=false]:sm:h-min group-data-[drawer-visible=false]:sm:w-auto",
          "group-data-[drawer-visible=false]:sm:min-w-[17rem] group-data-[drawer-visible=false]:sm:rounded-sm group-data-[drawer-visible=false]:sm:pt-0",
        )}
      >
        <button
          onClick={closeDrawer}
          className={twMerge(
            "absolute right-4 top-4",
            "group-data-[drawer-visible=false]:sm:hidden",
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
