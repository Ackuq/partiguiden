import Image from "next/image";
import { twMerge } from "tailwind-merge";

import { partyLogo } from "@lib/assets";
import type { Party } from "@partiguiden/party-data/types";

interface PartyIconProps {
  party: Party;
  className?: string;
  sizes?: string;
}

export default function PartyIcon({
  party,
  className,
  sizes = "24px",
}: PartyIconProps) {
  return (
    <div className={twMerge("relative h-6 w-6", className)}>
      <Image
        src={partyLogo(party)}
        fill
        sizes={sizes}
        className="object-cover"
        alt={`${party} logga`}
      />
    </div>
  );
}
