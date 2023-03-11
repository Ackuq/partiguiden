import {
  AbsenceLeaderboard,
  MemberAbsenceResponse,
  MemberAbsenceResponseNullSafe,
} from '../../types/member';
import { parliamentURL } from '../constants';

// We are only interested in primary members
const ignoreStatus = ['Tjänstgörande ersättare'];

export const createMemberAbsenceLeaderboard = (
  members: MemberAbsenceResponse[],
  limit: number
): AbsenceLeaderboard => {
  // Remove nulls
  const membersNullSafe = members.filter(
    (member): member is MemberAbsenceResponseNullSafe =>
      member.absence !== null && !ignoreStatus.includes(member.status)
  );
  // Descending order, top will have the least voting absence
  const sortedDescending = membersNullSafe.sort((a, b) => b.absence - a.absence);
  const leastAbsence = sortedDescending.slice(0, limit);
  const mostAbsence = sortedDescending.slice(-limit).reverse();
  return { mostAbsence, leastAbsence };
};

export const parsePictureUrl = (pictureUrl: string) => {
  const parsed = pictureUrl?.replace('http://', 'https://');
  // Sometimes the picture url does not include the domain
  if (!parsed.includes(parliamentURL)) {
    return parsed.replace('https://', parliamentURL);
  }
  return parsed;
};
