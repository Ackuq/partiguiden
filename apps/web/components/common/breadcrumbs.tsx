import { ChevronRightIcon, HomeIcon } from "@heroicons/react/20/solid";
import { routes } from "@lib/navigation";
import Link from "next/link";

export interface BreadcrumbsProps {
  links?: {
    href: string;
    title: string;
  }[];
  current: string;
}

export default function Breadcrumbs({ links, current }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumbs">
      <ol className="inline-flex items-center gap-1 text-slate-700 dark:text-slate-300 ">
        <li>
          <Link
            href={routes.index}
            className="flex items-center hover:opacity-75"
          >
            <HomeIcon className="-mt-0.5 mr-2 h-4 w-4" /> Hem
          </Link>
        </li>
        <ChevronRightIcon className="h-5 w-5" />
        {links?.map((link) => (
          <>
            <li key={link.href}>
              <Link href={link.href} className="hover:opacity-75">
                {link.title}
              </Link>
            </li>
            <ChevronRightIcon className="h-5 w-5" />
          </>
        ))}
        <li>{current}</li>
      </ol>
    </nav>
  );
}
