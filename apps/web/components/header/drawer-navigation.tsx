"use client";

import { EllipsisVerticalIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { mainNavigation } from "@lib/navigation";
import { useEffect, useState } from "react";
import DrawerEntry from "./drawer-entry";
import { twMerge } from "tailwind-merge";
import { usePathname } from "next/navigation";

export default function DrawerNavigation() {
  const pathname = usePathname();
  const [showDrawer, setShowDrawer] = useState(false);

  function toggleDrawer(event: React.MouseEvent) {
    event.stopPropagation();
    setShowDrawer((prevState) => !prevState);
  }

  useEffect(() => {
    if (showDrawer) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [showDrawer]);

  useEffect(() => {
    setShowDrawer(false);
  }, [pathname]);

  return (
    <div className="group sm:hidden" data-show={showDrawer}>
      <EllipsisVerticalIcon onClick={toggleDrawer} className="h-8 w-8 " />
      <div
        onClick={toggleDrawer}
        className={twMerge(
          "fixed left-0 top-0 z-30 hidden h-full w-full backdrop-blur-md",
          "group-data-[show=true]:block group-data-[show=true]:backdrop-blur-md",
        )}
      />
      <div
        className={twMerge(
          "bg-primary dark:bg-background-elevated-dark animate-drawer fixed -right-[18rem] top-0 z-40 h-full w-[18rem]",
          "transition-[right] group-data-[show=true]:right-0",
        )}
      >
        <button onClick={toggleDrawer} className="absolute right-4 top-4">
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
