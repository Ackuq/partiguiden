import type { MemberData } from "@lib/api/parliament/types";

import type { MemberListEntry } from "../types";
import parsePictureUrl from "./image";

export default function parseMemberListEntry(
  data: MemberData,
): MemberListEntry {
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
    party,
    district,
    status,
  };
}
