import type { Person } from "@lib/api/parliament/types";
import type { MemberListEntry } from "../types";
import parsePictureUrl from "./image";
import type { Party } from "@partiguiden/party-data/types";

export default function parseMemberListEntry(data: Person): MemberListEntry {
  const {
    intressent_id: id,
    tilltalsnamn: firstName,
    efternamn: lastName,
    fodd_ar: birthYear,
    valkrets: district,
    bild_url_192: pictureUrl,
    parti: party,
    status,
  } = data;

  const age = new Date().getFullYear() - parseInt(birthYear, 10);

  return {
    id,
    firstName,
    lastName,
    pictureUrl: parsePictureUrl(pictureUrl),
    age,
    party: party.toLowerCase() as Party | "-",
    district,
    status,
  };
}
