import PartyIcon from "@components/party/icon";
import {
  HomeIcon,
  PencilSquareIcon,
  UserCircleIcon,
  ChartBarIcon,
  InformationCircleIcon,
  DocumentCheckIcon,
  ChatBubbleLeftRightIcon,
  ScaleIcon,
  UserGroupIcon,
} from "@heroicons/react/24/solid";
import type { Party } from "@partiguiden/party-data/types";
import { partySortOrder } from "@partiguiden/party-data/types";
import { partyNames } from "@partiguiden/party-data/utils";

export const routes = {
  index: "/",
  cookiePolicy: "/cookie-policy",
  aboutUs: "/om-oss",
  polls: "/opinionsundersokningar",
  votes: "/votering",
  vote(id: string, bet: number) {
    return `/votering/${id}/${bet}`;
  },
  decisions: "/riksdagsbeslut",
  standpoints: "/standpunkter",
  standpoint(id: string) {
    return `/standpunkter/${id}`;
  },
  party(party: Party) {
    return `/parti/${party.toLocaleLowerCase()}`;
  },
  members: "/ledamot",
  member(id: string) {
    return `/ledamot/${id}`;
  },
  memberStatisticsYear: "/ledamot/statistik/riksmote",
  memberStatisticsPeriod: "/ledamot/statistik/mandatperiod",
  document(id: string) {
    return `/dokument/${id}`;
  },
  debates: "/debatter",
  debate(id: string) {
    return `/debatter/${id}`;
  },
  api: {
    memberDocument(id: string, page: number) {
      return `/api/member/${id}/documents/${page}`;
    },
  },
};

export interface RouteEntry {
  href: string;
  title: string;
  Icon: React.ElementType;
}

export type NavigationEntry =
  | RouteEntry
  | { title: string; Icon: React.ElementType; subPages: RouteEntry[] };

export const mainNavigation: NavigationEntry[] = [
  { href: routes.index, title: "Hem", Icon: HomeIcon },
  {
    href: routes.standpoints,
    title: "Partiernas Ståndpunkter",
    Icon: PencilSquareIcon,
  },
  {
    title: "Partierna",
    subPages: partySortOrder.map((party) => ({
      title: partyNames[party],
      href: routes.party(party),
      Icon: () => <PartyIcon party={party} />,
    })),
    Icon: UserGroupIcon,
  },
  { href: routes.decisions, title: "Riksdagsbeslut", Icon: DocumentCheckIcon },
  {
    href: routes.votes,
    title: "Voteringar",
    Icon: ScaleIcon,
  },
  {
    href: routes.debates,
    title: "Debatter",
    Icon: ChatBubbleLeftRightIcon,
  },
  {
    href: routes.members,
    title: "Ledamöter",
    Icon: UserCircleIcon,
  },
  {
    href: routes.polls,
    title: "Opinionsundersökningar",
    Icon: ChartBarIcon,
  },
  { href: routes.aboutUs, title: "Om oss", Icon: InformationCircleIcon },
];
