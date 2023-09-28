import Container from "@components/common/container";
import PageTitle from "@components/common/page-title";
import { membersController } from "@lib/api/controllers/members";
import MemberCard from "./member-card";

export const metadata = {
  title: "Riksdagsledamöter | Partiguiden",
  description:
    "Här kan du ta reda på information om ledamöterna i riksdagen, samt se vilka ledamöter är aktiva för varje parti",
};

export default async function MembersPage() {
  const members = await membersController();

  return (
    <main>
      <PageTitle>Riksdagsledamöter</PageTitle>

      <Container className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {members.map((member) => (
          <MemberCard key={member.id} member={member} />
        ))}
      </Container>
    </main>
  );
}
