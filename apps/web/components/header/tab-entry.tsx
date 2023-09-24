"use client";

import { ChevronDownIcon } from "@heroicons/react/24/solid";
import type { NavigationEntry, RouteEntry } from "@lib/navigation";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const className =
  "aria-current-page:border-b-2 border-primary-light dark:border-primary-elevated-light min-w-[90px] flex-shrink-0 whitespace-nowrap p-4 text-sm uppercase hover:opacity-80";

interface DropdownProps {
  title: string;
  routes: RouteEntry[];
}

function Dropdown({ routes, title }: DropdownProps) {
  const [isVisible, setIsVisible] = useState(false);

  const handleClick = () => {
    setIsVisible((prevState) => !prevState);
  };

  return (
    <div>
      <button
        className={`${className} inline-flex gap-2`}
        onClick={handleClick}
      >
        {title} <ChevronDownIcon className="-mt-1 h-4 w-4 self-center" />
      </button>
      <ul
        data-is-visible={isVisible}
        className="bg-background-elevated-light dark:bg-background-elevated-dark-200 text-font-light dark:text-font-primary absolute mt-1 flex-col rounded shadow-md data-[is-visible=true]:flex data-[is-visible=false]:hidden"
      >
        {routes.map((route) => (
          <li key={route.href} className="inline-flex text-left">
            <Link href={route.href} className="px-3 py-2">
              {route.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

interface TabEntryProps {
  item: NavigationEntry;
}

export default function TabEntry({ item }: TabEntryProps) {
  const pathname = usePathname();

  if ("subPages" in item) {
    return <Dropdown routes={item.subPages} title={item.title} />;
  }

  return (
    <Link
      key={item.href}
      href={item.href}
      aria-current={item.href === pathname && "page"}
      className={className}
    >
      {item.title}
    </Link>
  );
}
