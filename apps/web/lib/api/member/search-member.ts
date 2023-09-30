import { PARLIAMENT_BASE_URL } from "@lib/constants";
import { parseMember } from "./parsers/member";
import type { MemberParty, PersonListSingle } from "../parliament/types";

interface Query {
  fnamn: string;
  enamn: string;
  parti: MemberParty;
  rdlstatus?: string;
}

export default async function searchMember(parameters: Query) {
  const { fnamn, enamn, parti, rdlstatus } = parameters;
  const query = new URLSearchParams({
    fnamn,
    enamn,
    parti,
    rdlstatus: rdlstatus ?? "",
    utformat: "json",
  });

  const response = await fetch(`${PARLIAMENT_BASE_URL}/personlista/?${query}`, {
    next: { revalidate: 60 * 60 * 24 },
  });
  const data: PersonListSingle = await response.json();
  if (data.personlista.person) {
    return parseMember(data.personlista.person);
  }
  /* Sometimes the first(s) element in last name is an initial, remove it and try again */
  const lastNames = query.get("enamn")?.split(" ");
  if (lastNames && lastNames?.length > 1) {
    return searchMember({ ...parameters, enamn: lastNames.slice(1).join(" ") });
  }
  return null;
}
