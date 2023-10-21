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
    <div data-mobile-hidden={!drawerVisible} className="group">
      <div
        onClick={closeDrawer}
        aria-hidden="true"
        className={twMerge(
          "fixed left-0 top-0 z-50 hidden h-full w-full backdrop-blur-md",
          "group-data-[mobile-hidden=false]:block group-data-[mobile-hidden=false]:backdrop-blur-md",
        )}
      />
      <button
        onClick={openDrawer}
        aria-label="Öppna filtermeny"
        className={twMerge(
          "fixed bottom-4 right-4 z-50 rounded-full bg-slate-50 p-4 shadow-md dark:bg-slate-800",
          "sm:hidden",
        )}
      >
        <AdjustmentsHorizontalIcon className="h-10 w-10" />
      </button>
      <div
        className={twMerge(
          "top-0 z-50 h-screen overflow-y-scroll shadow-sm",
          "bg-white transition-transform dark:bg-slate-800",
          "w-drawer translate-x-drawer fixed right-0 pt-12 group-data-[mobile-hidden=false]:translate-x-0",
          // Desktop styles, disable when drawer-visible=true in order to correctly render the site when resized.
          "group-data-[mobile-hidden=true]:sm:top-header-sm-with-margin group-data-[mobile-hidden=true]:sm:max-h-full-without-header",
          "group-data-[mobile-hidden=true]:sm:sticky group-data-[mobile-hidden=true]:sm:transform-none",
          "group-data-[mobile-hidden=true]:sm:z-0 group-data-[mobile-hidden=true]:sm:h-min group-data-[mobile-hidden=true]:sm:w-auto",
          "group-data-[mobile-hidden=true]:sm:min-w-[17rem] group-data-[mobile-hidden=true]:sm:rounded-sm group-data-[mobile-hidden=true]:sm:pt-0",
          "sm:transition-none",
        )}
      >
        <button
          onClick={closeDrawer}
          aria-label="Stäng filtermeny"
          className={twMerge(
            "absolute right-4 top-4",
            "group-data-[mobile-hidden=true]:sm:hidden",
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
