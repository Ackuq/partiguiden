import type { MemberDocument } from "@lib/api/member/types";
import type { DocumentListEntry } from "@lib/api/parliament/types";
import { Committee } from "@lib/committes";

export default function parseMemberDocument(
  document: DocumentListEntry,
): MemberDocument {
  const {
    organ,
    dokumentnamn: title,
    undertitel: subtitle,
    notisrubrik: altTitle,
    id,
  } = document;

  const committee = Object.values(Committee).includes(organ as Committee)
    ? (organ as Committee)
    : undefined;

  return { committee, title, subtitle, altTitle, id };
}
