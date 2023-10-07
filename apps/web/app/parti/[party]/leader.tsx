"use client";
import type { Leader } from "@lib/api/member/types";
import Link from "next/link";
import { routes } from "@lib/navigation";
import MemberImage from "@components/parliament/member-image";

interface LeaderProps {
  leader: Leader;
}

export default function Leader({ leader }: LeaderProps) {
  return (
    <Link
      href={routes.member(leader.id)}
      className="hover:bg-background-elevated-light dark:hover:bg-background-elevated-dark-200 grid gap-2 rounded py-2 text-center transition-colors"
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
      {leader.role && <p className="self-end">{leader.role}</p>}
    </Link>
  );
}
