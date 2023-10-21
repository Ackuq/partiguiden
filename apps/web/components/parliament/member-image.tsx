"use client";

import Image from "next/image";
import { useState } from "react";
import { twMerge } from "tailwind-merge";

function firstLetterOfSentences(s: string) {
  return s
    .split(" ")
    .map((s) => s[0])
    .join("");
}

type MemberImageProps = React.PropsWithChildren<{
  imageUrl: string;
  firstName: string;
  lastName: string;
  className?: string;
  sizes?: string;
}>;

export default function MemberImage({
  imageUrl,
  firstName,
  lastName,
  className,
  children,
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
        <div className="bg-primary inline-flex h-full w-full items-center justify-center rounded-full">
          <span className="text-xl">
            {firstLetterOfSentences(firstName)}
            {firstLetterOfSentences(lastName)}
          </span>
        </div>
      )}
      {children}
    </div>
  );
}
