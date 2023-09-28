import searchMember from "@lib/api/member/search-member";
import type { Leader } from "@lib/api/member/types";
import type { Party } from "@partiguiden/party-data/types";

export default async function parseLeader(
  firstName: string,
  lastName: string,
  role: string,
  party: Party,
): Promise<Leader> {
  const member = await searchMember({
    fnamn: firstName,
    enamn: lastName,
    parti: party,
    rdlstatus: "samtliga",
  });

  if (member === null) {
    throw new Error("Couldn't find member");
  }

  return { role, ...member };
}
