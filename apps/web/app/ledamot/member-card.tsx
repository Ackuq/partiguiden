import MemberImage from "@components/parliament/member-image";
import type { MemberListEntry } from "@lib/api/types/member";
import { routes } from "@lib/navigation";
import Link from "next/link";
import { twMerge } from "tailwind-merge";

interface Props {
  member: MemberListEntry;
}

export default function MemberCard({ member }: Props) {
  return (
    <Link
      href={routes.member(member.id)}
      className={twMerge(
        "relative flex rounded p-4 shadow-sm",
        "bg-elevated-light dark:bg-background-elevated-dark ",
      )}
    >
      <div className="mb-10">
        <div className="font-bold">Valkrets</div>
        <div>{member.district}</div>
        <div className="mt-2 font-bold">Ålder</div>
        <div>{member.age}</div>
      </div>
      <MemberImage
        member={member}
        className="ml-auto h-32 w-32 sm:h-40 sm:w-40"
      />
      <div
        className={twMerge(
          "absolute bottom-0 left-0 w-full p-2",
          "bg-slate-500/75 backdrop-blur-sm dark:bg-slate-900/75",
        )}
      >
        {member.firstName} {member.lastName}
      </div>
    </Link>
  );
}
