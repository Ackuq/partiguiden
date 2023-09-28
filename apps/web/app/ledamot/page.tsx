import PageTitle from "@components/common/page-title";
import MemberCard from "./member-card";
import Filter from "@components/common/filter";
import getMembers from "@lib/api/member/get-members";

export const metadata = {
  title: "Riksdagsledamöter | Partiguiden",
  description:
    "Här kan du ta reda på information om ledamöterna i riksdagen, samt se vilka ledamöter är aktiva för varje parti",
};

export default async function MembersPage() {
  const members = await getMembers();

  return (
    <main>
      <PageTitle>Riksdagsledamöter</PageTitle>

      <div className="mx-4 mb-4 flex gap-2 xl:container xl:mx-auto">
        <ul className="grid flex-1 grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3">
          {members.map((member) => (
            <li key={member.id}>
              <MemberCard member={member} />
            </li>
          ))}
        </ul>
        <Filter />
      </div>
    </main>
  );
}
