import { PromisePool } from "@supercharge/promise-pool";

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
  const absence = await PromisePool.withConcurrency(30)
    .for(members)
    .process(async (member) => ({
      ...member,
      absence: await getAbsence({ id: member.id, parliamentYears }),
    }));

  return absence.results;
}
