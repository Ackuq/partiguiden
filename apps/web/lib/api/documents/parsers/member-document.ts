import type { MemberDocument } from "@lib/api/member/types";
import type { DocumentListEntry } from "@lib/api/parliament/types";

export default function parseMemberDocument(
  document: DocumentListEntry,
): MemberDocument {
  const {
    organ: committee,
    dokumentnamn: title,
    undertitel: subtitle,
    notisrubrik: altTitle,
    id,
  } = document;
  return { committee, title, subtitle, altTitle, id };
}
