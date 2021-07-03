import { MemberDocument, MemberDocuments } from '../../types/member';

export const serializeMemberDocument = (document: any): MemberDocument => {
  const {
    organ: authority,
    dokumentnamn: title,
    undertitel: subtitle,
    notisrubrik: altTitle,
    id,
  } = document;

  return { authority, title, subtitle, altTitle, id };
};

export const serializeMemberDocuments = (data: any): MemberDocuments => {
  const { dokumentlista } = data;
  const pages = parseInt(dokumentlista['@sidor'], 10);
  const count = parseInt(dokumentlista['@traffar'], 10);

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
