import { PARLIAMENT_BASE_URL } from "@lib/constants";
import type { Party } from "@partiguiden/party-data/types";
import { cache } from "react";
import type { PersonListMany } from "../parliament/types";
import parseMemberListEntry from "./parsers/member-list-entry";

// Revalidate data at most once per day (60 * 60 * 24)s
export const revalidate = 86400;

const getMembers = cache(async function (party: Uppercase<Party> | "" = "") {
  const query = new URLSearchParams({
    parti: party,
    utformat: "json",
    sort: "sorteringsnamn",
  });

  const response = await fetch(`${PARLIAMENT_BASE_URL}/personlista/?${query}`, {
    // The response will be too large to cache
    next: { revalidate: 0 },
  });
  const data: PersonListMany = await response.json();
  const members = data.personlista.person;
  return members.map(parseMemberListEntry);
});

export default getMembers;
