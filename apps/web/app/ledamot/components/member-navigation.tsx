import Link from "next/link";

import { routes } from "@lib/navigation";

const tabs = [
  { label: "Ledamöter", route: routes.members },
  { label: "Statistik riksmöte", route: routes.memberStatisticsYear },
  { label: "Statistik mandatperiod", route: routes.memberStatisticsPeriod },
] as const;

interface Props {
  value: number;
}

export default function MemberNavigation({ value }: Props) {
  return (
    <nav>
      <ul className="scrollbar-hide mb-2 flex overflow-x-scroll whitespace-nowrap">
        {tabs.map((tab, index) => (
          <li
            key={tab.route}
            className="py-3 first-of-type:ml-auto last-of-type:mr-auto"
          >
            <Link
              className="aria-[current=page]:border-b-2 border-teal-600 dark:border-teal-700 px-4 py-3 text-sm uppercase"
              aria-current={index === value ? "page" : "false"}
              href={tab.route}
            >
              {tab.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
