import { Fragment } from "react";
import { ChevronRightIcon, HomeIcon } from "@heroicons/react/20/solid";
import { routes } from "@lib/navigation";
import Link from "next/link";

const BreadcrumbDivider = () => (
  <ChevronRightIcon className="h-4 w-4 sm:h-5 sm:w-5" />
);

export interface BreadcrumbsProps {
  links?: {
    href: string;
    title: string;
  }[];
  current: string;
}

export default function Breadcrumbs({ links, current }: BreadcrumbsProps) {
  return (
    <nav aria-label="Brödsmulor">
      <ol className="sm:text-md inline-flex flex-wrap items-center gap-1 text-sm text-slate-700 dark:text-slate-300 ">
        <li>
          <Link
            href={routes.index}
            className="flex items-center hover:opacity-75"
          >
            <HomeIcon className="-mt-0.5 mr-1 h-3 w-3 sm:h-4 sm:w-4" /> Hem
          </Link>
        </li>
        <BreadcrumbDivider />
        {links?.map((link) => (
          <Fragment key={link.href}>
            <li key={link.href}>
              <Link href={link.href} className="hover:opacity-75">
                {link.title}
              </Link>
            </li>
            <BreadcrumbDivider />
          </Fragment>
        ))}
        <li className="whitespace-nowrap">{current}</li>
      </ol>
    </nav>
  );
}
