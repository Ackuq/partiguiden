import { PARLIAMENT_BASE_URL } from "@lib/constants";
import type { MemberResponse } from "./types";
import { parseMember } from "./parsers/member";
import type { PersonListSingle } from "../parliament/types";

export default async function getMember(
  id: string,
): Promise<MemberResponse | undefined> {
  const response = await fetch(`${PARLIAMENT_BASE_URL}/person/${id}/json`, {
    next: { revalidate: 60 * 60 * 24 },
  });

  if (response.status === 404) {
    return undefined;
  }

  const data: PersonListSingle = await response.json();

  if (parseInt(data.personlista["@hits"]) === 0) {
    return;
  }

  return parseMember(data.personlista.person);
}
