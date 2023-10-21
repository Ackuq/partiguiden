"use client";

import { EllipsisVerticalIcon } from "@heroicons/react/24/solid";
import { useContext } from "react";

import { DrawerContext } from "./drawer-context";

export default function DrawerToggle() {
  const { openDrawer } = useContext(DrawerContext);

  return (
    <button aria-label="Öppna meny" className="sm:hidden">
      <EllipsisVerticalIcon onClick={openDrawer} className="h-8 w-8" />
    </button>
  );
}
