import PageTitle from "@components/common/page-title";
import Filter from "@components/common/filter";
import getMembers from "@lib/api/member/get-members";
import MemberList from "./member-list";

export const metadata = {
  title: "Riksdagsledamöter | Partiguiden",
  description:
    "Här kan du ta reda på information om ledamöterna i riksdagen, samt se vilka ledamöter är aktiva för varje parti",
};

// Revalidate data at most once per day (60 * 60 * 24)s
export const revalidate = 86400;

export default async function MembersPage() {
  const members = await getMembers();

  return (
    <main>
      <PageTitle>Riksdagsledamöter</PageTitle>

      <div className="mx-4 mb-4 flex gap-2 xl:container xl:mx-auto">
        <MemberList members={members} />
        <Filter />
      </div>
    </main>
  );
}
