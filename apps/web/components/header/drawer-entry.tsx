import { ChevronDownIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { twMerge } from "tailwind-merge";

import type { NavigationEntry, RouteEntry } from "@lib/navigation";

const drawerEntryClassName = twMerge(
  "flex w-full items-center gap-6 px-4 text-lg",
  "dark:aria-[current=page]:text-teal-200 ",
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
      // eslint-disable-next-line react-hooks/set-state-in-effect
      close();
    }
  }, [pathname, routePaths]);

  return (
    <div className="flex flex-col gap-3">
      <button
        onClick={toggleVisible}
        className={twMerge("group/dropdown", drawerEntryClassName)}
        aria-expanded={isVisible}
      >
        <Icon className="h-5 w-5" />
        {title}
        <ChevronDownIcon className="ml-auto h-4 w-4 self-center group-aria-expanded/dropdown:rotate-180" />
      </button>

      {routes.map((route) => (
        <Link
          prefetch={!route.disablePrefetch}
          aria-hidden={!isVisible}
          key={route.href}
          href={route.href}
          aria-current={route.href === pathname && "page"}
          className={twMerge(
            drawerEntryClassName,
            "pl-6",
            "aria-hidden:hidden",
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
      prefetch={!item.disablePrefetch}
      href={item.href}
      aria-current={
        (item.href === pathname ||
          new RegExp(`^${item.href}/.*`).test(pathname)) &&
        "page"
      }
      className={drawerEntryClassName}
    >
      <item.Icon className="h-5 w-5" />
      {item.title}
    </Link>
  );
}
