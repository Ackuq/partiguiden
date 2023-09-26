import { ChevronDownIcon } from "@heroicons/react/24/solid";
import type { NavigationEntry, RouteEntry } from "@lib/navigation";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

const drawerEntryClassName = "flex w-full items-center gap-6 px-4 text-lg";

interface DropdownProps {
  title: string;
  routes: RouteEntry[];
  Icon: React.ElementType;
}

function Dropdown({ routes, title, Icon }: DropdownProps) {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(false);

  function toggleVisible() {
    setIsVisible((prevState) => !prevState);
  }

  function close() {
    setIsVisible(false);
  }

  useEffect(() => {
    close();
  }, [pathname]);

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
  if ("subPages" in item) {
    return (
      <Dropdown routes={item.subPages} title={item.title} Icon={item.Icon} />
    );
  }

  return (
    <Link href={item.href} className={drawerEntryClassName}>
      <item.Icon className="h-5 w-5" />
      {item.title}
    </Link>
  );
}
