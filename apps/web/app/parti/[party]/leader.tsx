"use client";

import Link from "next/link";

import MemberImage from "@components/parliament/member-image";
import type { Leader as TLeader } from "@lib/api/member/types";
import { routes } from "@lib/navigation";

interface LeaderProps {
  leader: TLeader;
}

export default function Leader({ leader }: LeaderProps) {
  return (
    <Link
      href={routes.member(leader.id)}
      className="flex flex-col gap-2 rounded-sm py-2 text-center transition-colors hover:bg-slate-100 dark:hover:bg-slate-700"
    >
      <MemberImage
        imageUrl={leader.pictureUrl}
        firstName={leader.firstName}
        lastName={leader.lastName}
        className="mx-auto"
      />

      <p className="text-lg">
        {leader.firstName} {leader.lastName}
      </p>
      {leader.role && <p className="mt-auto">{leader.role}</p>}
    </Link>
  );
}
