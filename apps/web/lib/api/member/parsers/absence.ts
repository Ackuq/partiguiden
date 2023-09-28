import type { VoteListGroupedSingle } from "@lib/api/parliament/types";

export default function serializeAbsence(
  data: VoteListGroupedSingle,
): number | null {
  if (data.voteringlista.votering) {
    const votes = data.voteringlista.votering;
    const total =
      (parseInt(votes.Ja, 10) || 0) +
      (parseInt(votes.Nej, 10) || 0) +
      (parseInt(votes.Frånvarande, 10) || 0) +
      (parseInt(votes.Avstår, 10) || 0);
    return (
      Math.round((1 - (parseInt(votes.Frånvarande, 10) || 0) / total) * 1000) /
      10
    );
  }
  return null;
}
