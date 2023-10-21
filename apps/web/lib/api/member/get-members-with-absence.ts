import type { MemberParty } from "../parliament/types";
import getAbsence from "./get-absence";
import getMembers from "./get-members";
import type { MemberAbsenceResponse } from "./types";

interface Query {
  parliamentYears?: string[];
  party?: MemberParty | "";
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
