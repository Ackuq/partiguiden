import PageTitle from "@components/common/page-title";
import Filter from "@components/filter";
import getMembers from "@lib/api/member/get-members";
import MemberList from "./components/member-list";
import type { FilterToggle } from "@components/filter/filter-context";
import { FilterContextProvider } from "@components/filter/filter-context";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import MemberNavigation from "./components/member-navigation";
import type { MemberParty } from "@lib/api/parliament/types";
import { partyNames } from "@partiguiden/party-data/utils";
import { partySortOrder } from "@partiguiden/party-data/types";

const order = [...partySortOrder, "-"] as const;

const partyFilterToggles: FilterToggle<MemberParty> = order.reduce(
  (prev, party) => ({
    ...prev,
    [party]: {
      title: party === "-" ? "Partilösa" : partyNames[party],
      value: false,
    },
  }),
  {} as FilterToggle<MemberParty>,
);

export default async function MembersPage() {
  const members = await getMembers();

  return (
    <main>
      <PageTitle className="mb-0" Icon={UserCircleIcon}>
        Riksdagsledamöter
      </PageTitle>
      <MemberNavigation value={0} />
      <div className="mx-4 mb-4 block gap-2 2xl:container sm:flex 2xl:mx-auto">
        <FilterContextProvider initialToggles={partyFilterToggles}>
          <MemberList members={members} />
          <Filter />
        </FilterContextProvider>
      </div>
    </main>
  );
}

export const metadata = {
  title: "Riksdagsledamöter | Partiguiden",
  description:
    "Här kan du ta reda på information om ledamöterna i riksdagen, samt se vilka ledamöter är aktiva för varje parti",
};

// Revalidate data at most once per day (60 * 60 * 24)s
export const revalidate = 86400;
