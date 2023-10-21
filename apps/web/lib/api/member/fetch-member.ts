import { PARLIAMENT_BASE_URL } from "@lib/constants";

import type { MemberLookup } from "../parliament/types";

export default async function fetchMember(id: string) {
  const response = await fetch(`${PARLIAMENT_BASE_URL}/person/${id}/json`, {
    next: { revalidate: 60 * 60 * 24 },
  });

  if (response.status === 404) {
    return undefined;
  }

  const data: MemberLookup = await response.json();

  if (parseInt(data.personlista["@hits"]) === 0) {
    return;
  }

  return data;
}
