import {
  HomeIcon,
  PencilSquareIcon,
  UserCircleIcon,
  ChartBarIcon,
  InformationCircleIcon,
  DocumentCheckIcon,
  ChatBubbleLeftRightIcon,
  ScaleIcon,
} from "@heroicons/react/24/solid";

export const routes = {
  index: "/",
  cookiePolicy: "/cookie-policy",
  aboutUs: "/om-oss",
  polls: "/polls",
  votes: "/voteringar",
  vote: "/vote/[id]/[bet]",
  decisions: "/decisions",
  standpoints: "/standpunkter",
  standpoint(id: string) {
    return `/standpunkter/${id}`;
  },
  party: "/party/[party]",
  members: "/member",
  member: "/member/[id]",
  memberStatsYear: "/member-stats/year",
  memberStatsPeriod: "/member-stats/period",
  document: "/document/[id]",
  debates: "/debate",
  debate: "/debate/[id]",
};

export const mainNavigation = [
  { href: routes.index, title: "Hem", Icon: HomeIcon },
  {
    href: routes.standpoints,
    title: "Partiernas Ståndpunkter",
    Icon: PencilSquareIcon,
  },
  // {
  //   href: routes.party,
  //   title: "Partierna",
  //   Icon: UserGroupIcon,
  // },
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
