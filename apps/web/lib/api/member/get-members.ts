import { unstable_cache as cache } from "next/cache";

import { PARLIAMENT_BASE_URL } from "@lib/constants";
import { body } from "@lib/utils/json";

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
    {
      next: {
        revalidate: 60 * 60 * 24, // Once per day
      },
    },
  );
  const data = await body<MemberList>(response);
  const members = data.personlista.person;
  return members.map(parseMemberListEntry);
};

export default cache(getMembers, ["get-members"], {
  // Once per day
  revalidate: 60 * 60 * 24,
});
