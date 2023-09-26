"use client";

import { ChevronDownIcon } from "@heroicons/react/24/solid";
import useOutsideClick from "@lib/hooks/use-outside-click";
import type { NavigationEntry, RouteEntry } from "@lib/navigation";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { twMerge } from "tailwind-merge";

const tabClassName =
  "aria-current-page:border-b-2 border-primary-light dark:border-primary-elevated-light min-w-[90px] flex-shrink-0 whitespace-nowrap p-4 text-sm uppercase hover:opacity-80";

interface DropdownProps {
  title: string;
  routes: RouteEntry[];
}

function Dropdown({ routes, title }: DropdownProps) {
  const [isVisible, setIsVisible] = useState(false);

  function handleClick() {
    setIsVisible((prevState) => !prevState);
  }

  function handleClose() {
    setIsVisible(false);
  }

  const ref = useOutsideClick<HTMLDivElement>(handleClose);

  return (
    <div ref={ref}>
      <button
        className={twMerge(tabClassName, "inline-flex gap-2")}
        onClick={handleClick}
      >
        {title} <ChevronDownIcon className="h-4 w-4 self-center" />
      </button>
      <ul
        data-is-visible={isVisible}
        className="bg-background-elevated-light dark:bg-background-elevated-dark-200 text-font-light dark:text-font-primary absolute mt-1 flex-col rounded shadow-md data-[is-visible=true]:flex data-[is-visible=false]:hidden"
      >
        {routes.map(({ href, title, Icon }) => (
          <li key={href} className="text-left">
            <Link
              href={href}
              className="inline-flex items-center gap-2 px-3 py-2 hover:opacity-75"
              onClick={handleClose}
            >
              {Icon && <Icon />}
              {title}
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
      className={tabClassName}
    >
      {item.title}
    </Link>
  );
}
