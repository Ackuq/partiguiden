"use client";

import Image from "next/image";
import { useState } from "react";
import { twMerge } from "tailwind-merge";

import { partyLogo } from "@lib/assets";
import type { Party } from "@partiguiden/party-data/types";
import { partyNames } from "@partiguiden/party-data/utils";

function firstLetterOfSentences(s: string) {
  return s
    .split(" ")
    .map((s) => s[0])
    .join("");
}

interface MemberImageProps {
  imageUrl: string;
  firstName: string;
  lastName: string;
  party?: Party | "-";
  logoDirection?: "left" | "right";
  className?: string;
  sizes?: string;
}

export default function MemberImage({
  imageUrl,
  firstName,
  lastName,
  className,
  logoDirection = "left",
  party,
  sizes = "(min-width: 640px) 160px, 96px",
}: MemberImageProps) {
  const [fallback, setFallback] = useState(false);

  return (
    <div className={twMerge("relative h-24 w-24 sm:h-40 sm:w-40", className)}>
      {!fallback ? (
        <Image
          src={imageUrl}
          alt={`${firstName} ${lastName}`}
          fill
          sizes={sizes}
          className="rounded-full object-cover"
          onError={() => setFallback(true)}
        />
      ) : (
        <div className="bg-teal-700 inline-flex h-full w-full items-center justify-center rounded-full">
          <span className="text-xl">
            {firstLetterOfSentences(firstName)}
            {firstLetterOfSentences(lastName)}
          </span>
        </div>
      )}
      {party && party !== "-" && (
        <Image
          className={twMerge(
            "absolute top-0 w-[33%]",
            logoDirection === "left" ? "left-0" : "right-0",
          )}
          width={64}
          height={64}
          src={partyLogo(party)}
          alt={`${partyNames[party]}s logga`}
        />
      )}
    </div>
  );
}
