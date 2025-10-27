"use client";

import { usePathname } from "next/navigation";
import { createContext, useEffect, useState } from "react";

interface IDrawerContext {
  drawerIsOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
}

export const DrawerContext = createContext<IDrawerContext>({
  drawerIsOpen: false,
  openDrawer: () => void {},
  closeDrawer: () => void {},
});

export const DrawerContextProvider = ({
  children,
}: React.PropsWithChildren) => {
  const pathname = usePathname();
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);

  function openDrawer() {
    setDrawerIsOpen(true);
  }

  function closeDrawer() {
    setDrawerIsOpen(false);
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    closeDrawer();
  }, [pathname]);

  return (
    <DrawerContext.Provider value={{ drawerIsOpen, openDrawer, closeDrawer }}>
      {children}
    </DrawerContext.Provider>
  );
};
