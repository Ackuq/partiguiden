"use client";
import type { MemberListEntry } from "@lib/api/types/member";
import Image from "next/image";
import { useState } from "react";
import { twMerge } from "tailwind-merge";

function firstLetterOfSentences(s: string) {
  return s
    .split(" ")
    .map((s) => s[0])
    .join("");
}

interface MemberImageProps {
  member: MemberListEntry;
  className?: string;
}

export default function MemberImage({ member, className }: MemberImageProps) {
  const [fallback, setFallback] = useState(false);

  return (
    <div
      className={twMerge(
        "xs:h-32 xs:w-32 relative h-24 w-24 sm:h-40 sm:w-40",
        className,
      )}
    >
      {!fallback ? (
        <Image
          src={member.pictureUrl}
          alt={`${member.firstName} ${member.lastName}`}
          fill
          className="rounded-full object-cover"
          onError={() => setFallback(true)}
        />
      ) : (
        <div className="bg-primary inline-flex h-full w-full items-center justify-center rounded-full">
          <span className="text-xl">
            {firstLetterOfSentences(member.firstName)}
            {firstLetterOfSentences(member.lastName)}
          </span>
        </div>
      )}
    </div>
  );
}
