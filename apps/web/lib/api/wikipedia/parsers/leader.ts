import searchMember from "@lib/api/member/search-member";
import type { Leader } from "@lib/api/member/types";
import type { Party } from "@partiguiden/party-data/types";

export default async function parseLeader(
  firstName: string,
  lastName: string,
  role: string,
  party: Party,
): Promise<Leader | null> {
  const member = await searchMember({
    fnamn: firstName,
    enamn: lastName,
    parti: party,
    rdlstatus: "samtliga",
  });

  if (member === null) {
    console.error("Couldn't find member", { firstName, lastName, role });
    return null;
  }

  return { role, ...member };
}
