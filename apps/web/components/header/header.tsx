import { DrawerContextProvider } from "./drawer-context";
import DrawerNavigation from "./drawer-navigation";
import DrawerToggle from "./drawer-toggle";
import MainLogo from "./main-logo";
import TabNavigation from "./tab-navigation";
import ThemeToggle from "./theme-toggle";

export default function Header() {
  return (
    <DrawerContextProvider>
      <DrawerNavigation />
      <div className="bg-primary h-header sm:h-header-sm absolute w-full dark:bg-slate-800"></div>
      <header className="h-header sm:h-header-sm sticky top-0 z-10 flex shadow-md">
        <div className="bg-primary/80 flex h-full w-full flex-col text-slate-50 backdrop-blur-md dark:bg-slate-800/75">
          <div className="container flex flex-1 items-center">
            <MainLogo />
            <div className="ml-auto flex gap-4">
              <ThemeToggle />
              <DrawerToggle />
            </div>
          </div>
          <TabNavigation />
        </div>
      </header>
    </DrawerContextProvider>
  );
}
