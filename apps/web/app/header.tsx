import Link from "next/link";

function MainLogo() {
  return (
    <Link href="/" className="text-3xl font-medium">
      Partiguiden
    </Link>
  );
}

export default function Header() {
  return (
    <>
      <div className="bg-background-elevated-light dark:bg-background-elevated-dark absolute h-12 w-full sm:h-20"></div>
      <header className="bg-background-elevated-light/75 dark:bg-background-elevated-dark/75 sticky top-0 h-12 px-4  backdrop-blur-md sm:h-20">
        <div className="container">
          <div className="flex items-center">
            <MainLogo />
          </div>
          <nav>
            <Link href="/">link</Link>
          </nav>
        </div>
      </header>
    </>
  );
}
