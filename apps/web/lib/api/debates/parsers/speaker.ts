import type { MemberLookup } from "@lib/api/parliament/types";
import type { Speaker } from "../types";
import parsePictureUrl from "@lib/api/member/parsers/image";

export default function parseSpeaker(data: MemberLookup): Speaker {
  const {
    intressent_id: id,
    tilltalsnamn: firstName,
    efternamn: lastName,
    bild_url_192: imageUrl,
    parti: party,
  } = data.personlista.person;

  return {
    id,
    firstName,
    lastName,
    imageUrl: parsePictureUrl(imageUrl),
    party,
  };
}
