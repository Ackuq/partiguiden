import ThemeToggle from "@components/theme-toggle";
import TabNavigation from "./tab-navigation";
import DrawerNavigation from "./drawer-navigation";
import MainLogo from "./main-logo";
import { DrawerContextProvider } from "./drawer-context";
import DrawerToggle from "./drawer-toggle";

export default function Header() {
  return (
    <DrawerContextProvider>
      <DrawerNavigation />
      <div className="bg-primary dark:bg-background-elevated-dark absolute h-14 w-full sm:h-24"></div>
      <header className="sticky top-0 z-10 flex h-14 shadow-md sm:h-24">
        <div className="bg-primary/80 text-font-dark dark:bg-background-elevated-dark/75 flex h-full w-full flex-col backdrop-blur-md">
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
