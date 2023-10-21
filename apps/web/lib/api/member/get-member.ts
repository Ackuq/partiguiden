import fetchMember from "./fetch-member";
import { parseMember } from "./parsers/member";
import type { MemberResponse } from "./types";

export default async function getMember(
  id: string,
): Promise<MemberResponse | undefined> {
  const data = await fetchMember(id);

  if (!data) {
    return;
  }

  return parseMember(data.personlista.person);
}
