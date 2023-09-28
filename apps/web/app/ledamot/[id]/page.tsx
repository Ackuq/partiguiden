import getMember from "@lib/api/member/get-member";
import getMembers from "@lib/api/member/get-members";
import { ERROR_404_TITLE } from "@lib/constants";
import { notFound } from "next/navigation";

interface PageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params: { id } }: PageProps) {
  const member = await getMember(id);

  if (!member) {
    return {
      title: ERROR_404_TITLE,
    };
  }
  const memberName = `${member?.firstName ?? ""} ${
    member?.lastName ?? ""
  }`.trim();
  return {
    title: `${!!memberName ? `${memberName} |` : ""} Ledamot | Partiguiden`,
    description: `Här kan du ta reda på information om ledamot${
      !!memberName ? ` ${memberName}` : ""
    }. Se vilka dokument som hen har varit med och skapat och samt voteringsnärvaro.`,
  };
}

export default async function MemberPage({ params: { id } }: PageProps) {
  const member = await getMember(id);
  if (!member) {
    return notFound();
  }
  // TODO: Implement
  return (
    <h1>
      {member.firstName} {member.lastName}
    </h1>
  );
}

export async function generateStaticParams() {
  const members = await getMembers();

  return members.map((member) => ({
    id: member.id,
  }));
}
