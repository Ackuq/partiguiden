import { ChevronDownIcon } from "@heroicons/react/24/solid";
import type { NavigationEntry, RouteEntry } from "@lib/navigation";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { twMerge } from "tailwind-merge";

const drawerEntryClassName = twMerge(
  "flex w-full items-center gap-6 px-4 text-lg",
  "aria-current-page:text-slate-300 dark:aria-current-page:text-primary-light ",
);

interface DropdownProps {
  title: string;
  routes: RouteEntry[];
  Icon: React.ElementType;
}

function Dropdown({ routes, title, Icon }: DropdownProps) {
  const routePaths = useMemo(() => routes.map((route) => route.href), [routes]);
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(
    routePaths.includes(pathname ?? ""),
  );

  function toggleVisible() {
    setIsVisible((prevState) => !prevState);
  }

  function close() {
    setIsVisible(false);
  }

  useEffect(() => {
    if (!routePaths.includes(pathname ?? "")) {
      close();
    }
  }, [pathname, routePaths]);

  return (
    <div data-active={isVisible} className="group flex flex-col gap-3">
      <button onClick={toggleVisible} className={drawerEntryClassName}>
        <Icon className="h-5 w-5" />
        {title}
        <ChevronDownIcon
          className={twMerge(
            "ml-auto h-4 w-4 self-center",
            "group-data-[active=true]:rotate-180",
          )}
        />
      </button>

      {routes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          aria-current={route.href === pathname && "page"}
          className={twMerge(
            drawerEntryClassName,
            "pl-6",
            "group-data-[active=false]:hidden",
          )}
        >
          <route.Icon />
          {route.title}
        </Link>
      ))}
    </div>
  );
}

interface DrawerEntryProps {
  item: NavigationEntry;
}

export default function DrawerEntry({ item }: DrawerEntryProps) {
  const pathname = usePathname();
  if ("subPages" in item) {
    return (
      <Dropdown routes={item.subPages} title={item.title} Icon={item.Icon} />
    );
  }

  return (
    <Link
      href={item.href}
      aria-current={item.href === pathname && "page"}
      className={drawerEntryClassName}
    >
      <item.Icon className="h-5 w-5" />
      {item.title}
    </Link>
  );
}
