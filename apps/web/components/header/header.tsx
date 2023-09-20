import ThemeToggle from "@components/theme-toggle";
import Link from "next/link";
import TabNavigation from "./tab-navigation";

function MainLogo() {
  return (
    <Link href="/" className="text-font-dark text-3xl font-medium">
      Partiguiden
    </Link>
  );
}

export default function Header() {
  return (
    <>
      <div className="bg-primary-elevated-light dark:bg-background-elevated-dark absolute h-14 w-full sm:h-24"></div>
      <header className="bg-primary-elevated-light/75 text-font-dark dark:bg-background-elevated-dark/75 sticky top-0 flex h-14 flex-col shadow-md backdrop-blur-md sm:h-24">
        <div className="container flex h-full items-center justify-between">
          <MainLogo />
          <ThemeToggle />
        </div>
        <TabNavigation />
      </header>
    </>
  );
}
