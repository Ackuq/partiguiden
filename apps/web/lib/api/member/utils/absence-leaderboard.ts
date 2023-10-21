import type { AbsenceLeaderboard, MemberAbsenceResponse } from "../types";

// We are only interested in primary members
const ignoreStatus = ["Tjänstgörande ersättare"];

export const createMemberAbsenceLeaderboard = (
  members: MemberAbsenceResponse[],
  limit: number,
): AbsenceLeaderboard => {
  // Remove nulls
  const membersWithAbsence = members.filter(
    (member): member is MemberAbsenceResponse & { absence: number } =>
      member.absence !== undefined && !ignoreStatus.includes(member.status),
  );
  // Descending order, top will have the least voting absence
  const sortedDescending = membersWithAbsence.sort(
    (a, b) => b.absence - a.absence,
  );
  const leastAbsence = sortedDescending.slice(0, limit);
  const mostAbsence = sortedDescending.slice(-limit).reverse();
  return { mostAbsence, leastAbsence };
};
