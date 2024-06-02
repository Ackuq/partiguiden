import { unstable_cache as cache } from "next/cache";

import { PARLIAMENT_BASE_URL } from "@lib/constants";

import type { MemberList, MemberParty } from "../parliament/types";
import parseMemberListEntry from "./parsers/member-list-entry";

const getMembers = async (party: MemberParty | "" = "") => {
  const query = new URLSearchParams({
    parti: party,
    utformat: "json",
    sort: "sorteringsnamn",
  });

  const response = await fetch(
    `${PARLIAMENT_BASE_URL}/personlista/?${query.toString()}`,
  );
  const data: MemberList = await response.json();
  const members = data.personlista.person;
  return members.map(parseMemberListEntry);
};

export default cache(getMembers, ["get-members"], {
  // Once per day
  revalidate: 60 * 60 * 24,
});
