import type { MemberListEntry } from "@lib/api/member/types";
import MemberCard from "./member-card";

interface Props {
  members: MemberListEntry[];
}

export default function MemberList({ members }: Props) {
  // TODO: Proper filtering and infinite scroll
  const filteredMembers = members.slice(0, 20);

  return (
    <ul className="grid flex-1 grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3">
      {filteredMembers.map((member) => (
        <li key={member.id}>
          <MemberCard member={member} />
        </li>
      ))}
    </ul>
  );
}
