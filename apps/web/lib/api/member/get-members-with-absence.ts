import type { Party } from "@partiguiden/party-data/types";
import type { MemberAbsenceResponse } from "./types";
import getMembers from "./get-members";
import getAbsence from "./get-absence";

interface Query {
  parliamentYears: string[];
  party: Uppercase<Party> | "";
}

export default async function membersWithAbsenceController({
  parliamentYears = [],
  party = "",
}: Query): Promise<MemberAbsenceResponse[]> {
  const members = await getMembers(party);
  const absencePromises = members.map((member) =>
    getAbsence({ id: member.id, parliamentYears }),
  );

  const absence = await Promise.all(absencePromises);

  return members.map((member, index) => ({
    ...member,
    absence: absence[index],
  }));
}
