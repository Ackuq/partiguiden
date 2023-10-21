import ThemeToggle from "./theme-toggle";
import TabNavigation from "./tab-navigation";
import DrawerNavigation from "./drawer-navigation";
import MainLogo from "./main-logo";
import { DrawerContextProvider } from "./drawer-context";
import DrawerToggle from "./drawer-toggle";

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
