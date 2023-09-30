import { PARLIAMENT_BASE_URL } from "@lib/constants";
import type { MemberResponse } from "./types";
import { parseMember } from "./parsers/member";
import type { PersonListSingle } from "../parliament/types";

export default async function getMember(id: string): Promise<MemberResponse> {
  const response = await fetch(`${PARLIAMENT_BASE_URL}/person/${id}/json`, {
    next: { revalidate: 60 * 60 * 24 },
  });
  const data: PersonListSingle = await response.json();
  return parseMember(data.personlista.person);
}
