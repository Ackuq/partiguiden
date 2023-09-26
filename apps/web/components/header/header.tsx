import ThemeToggle from "@components/theme-toggle";
import TabNavigation from "./tab-navigation";
import DrawerNavigation from "./drawer-navigation";
import MainLogo from "./main-logo";

export default function Header() {
  return (
    <>
      <div className="bg-primary dark:bg-background-elevated-dark absolute h-14 w-full sm:h-24"></div>
      <header className="bg-primary/80 text-font-dark dark:bg-background-elevated-dark/75 sticky top-0 flex h-14 flex-col shadow-md backdrop-blur-md sm:h-24">
        <div className="container flex h-full items-center">
          <MainLogo />
          <div className="ml-auto flex gap-4">
            <ThemeToggle />
            <DrawerNavigation />
          </div>
        </div>
        <TabNavigation />
      </header>
    </>
  );
}
