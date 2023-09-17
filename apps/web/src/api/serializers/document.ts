import type { DocumentList, DocumentListEntry } from "../../types/parliament";
import type { MemberDocument, MemberDocuments } from "../../types/member";

export const serializeMemberDocument = (
  document: DocumentListEntry,
): MemberDocument => {
  const {
    organ: authority,
    dokumentnamn: title,
    undertitel: subtitle,
    notisrubrik: altTitle,
    id,
  } = document;

  return { authority, title, subtitle, altTitle, id };
};

export const serializeMemberDocuments = (
  data: DocumentList,
): MemberDocuments => {
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

  const documents = dokumentlista.dokument.map(serializeMemberDocument);

  return {
    pages,
    count,
    documents,
  };
};
