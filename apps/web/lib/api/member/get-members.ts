import { PARLIAMENT_BASE_URL } from "@lib/constants";
import { cache } from "react";
import type { MemberParty, PersonListMany } from "../parliament/types";
import parseMemberListEntry from "./parsers/member-list-entry";

const getMembers = async (party: MemberParty | "" = "") => {
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
};

// Revalidate data at most once per day (60 * 60 * 24)s
export const revalidate = 86400;

export default cache(getMembers);
