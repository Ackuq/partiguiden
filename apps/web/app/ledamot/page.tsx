import PageTitle from "@components/common/page-title";

export const metadata = {
  title: "Riksdagsledamöter | Partiguiden",
  description:
    "Här kan du ta reda på information om ledamöterna i riksdagen, samt se vilka ledamöter är aktiva för varje parti",
};

export default async function MembersPage() {
  // const members = await membersController();

  return (
    <main>
      <PageTitle>Riksdagsledamöter</PageTitle>
    </main>
  );
}
