import Image from "next/image";
import { partyLogo } from "@lib/assets";
import type { Party } from "@partiguiden/party-data/types";

interface PartyIconProps {
  party: Party;
}

export default function PartyIcon({ party }: PartyIconProps) {
  return (
    <Image
      src={partyLogo(party)}
      width={30}
      height={30}
      alt={`${party} logo`}
    />
  );
}
