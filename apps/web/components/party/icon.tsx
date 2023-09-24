import Image from "next/image";
import { partyLogo } from "@lib/assets";
import type { Party } from "@partiguiden/party-data/types";

interface PartyIconProps {
  party: Party;
  size?: number;
  className?: string;
}

export default function PartyIcon({
  party,
  size = 25,
  className,
}: PartyIconProps) {
  return (
    <Image
      src={partyLogo(party)}
      width={size}
      height={size}
      alt={`${party} logo`}
      className={className}
    />
  );
}
