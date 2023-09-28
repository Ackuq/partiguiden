import MemberImage from "@components/parliament/member-image";
import type { MemberListEntry } from "@lib/api/types/member";
import { partyLogo } from "@lib/assets";
import { routes } from "@lib/navigation";
import Image from "next/image";
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
        "relative flex rounded p-4 shadow-md",
        "dark:bg-background-elevated-dark bg-white",
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
        sizes="(min-width: 640px) 10rem, 8rem"
        className="mb-1 ml-auto h-32 w-32 sm:h-40 sm:w-40"
      >
        {member.party !== "-" && (
          <Image
            className="absolute left-0"
            width={40}
            height={40}
            src={partyLogo(member.party)}
            alt="Partisymbol"
          />
        )}
      </MemberImage>
      <div
        className={twMerge(
          "text-font-dark absolute bottom-0 left-0 w-full rounded-b p-2",
          "bg-slate-600/70 backdrop-blur-sm dark:bg-slate-900/75",
        )}
      >
        {member.firstName} {member.lastName}
      </div>
    </Link>
  );
}
