import type { MemberDocuments } from "@lib/api/member/types";
import type { DocumentList } from "@lib/api/parliament/types";
import parseMemberDocument from "./member-document";

export default function parseMemberDocuments(
  data: DocumentList,
): MemberDocuments {
  const { dokumentlista } = data;
  const pages = parseInt(dokumentlista["@sidor"], 10);
  const count = parseInt(dokumentlista["@traffar"], 10);

  if (!dokumentlista.dokument || pages === 0) {
    return {
      pages,
      count,
      documents: [],
    };
  }

  const documents = dokumentlista.dokument.map(parseMemberDocument);

  return {
    pages,
    count,
    documents,
  };
}
