import Link from "next/link";
import { twMerge } from "tailwind-merge";

import MemberImage from "@components/parliament/member-image";
import type { MemberListEntry } from "@lib/api/member/types";
import { routes } from "@lib/navigation";

interface Props {
  member: MemberListEntry;
}

export default function MemberCard({ member }: Props) {
  return (
    <Link
      href={routes.member(member.id)}
      className={twMerge(
        "relative flex rounded-sm p-4 shadow-md",
        "bg-white dark:bg-slate-800",
      )}
    >
      <div className="mb-10">
        <div className="font-medium">Valkrets</div>
        <div>{member.district}</div>
        <div className="mt-2 font-medium">Ålder</div>
        <div>{member.age}</div>
      </div>
      <MemberImage
        imageUrl={member.pictureUrl}
        firstName={member.firstName}
        lastName={member.lastName}
        party={member.party}
        sizes="(min-width: 640px) 160px, 128px"
        className="mb-1 ml-auto h-32 w-32 sm:h-40 sm:w-40"
      />
      <div
        className={twMerge(
          "absolute bottom-0 left-0 w-full rounded-b p-2 text-slate-50",
          "bg-slate-600/70 backdrop-blur-xs dark:bg-slate-900/75",
        )}
      >
        {member.firstName} {member.lastName}
      </div>
    </Link>
  );
}
