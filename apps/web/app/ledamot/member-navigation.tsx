import { routes } from "@lib/navigation";
import Link from "next/link";

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
              className="aria-current-page:border-b-2 border-primary-light dark:border-primary px-4 py-3 text-sm uppercase"
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
