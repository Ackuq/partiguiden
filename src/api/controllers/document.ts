import { DocumentList, DocumentStatus, UnknownDocumentStatus } from '../../types/parliament';
import { DocumentResponse } from '../../types/document';
import { MemberDocuments } from '../../types/member';
import { ParsedUrlQuery, stringify } from 'querystring';
import { parliamentURL } from '../constants';
import { serializeMemberDocuments } from '../serializers/document';

export const getHtmlDocument = (id: string): Promise<string> =>
  fetch(`${parliamentURL}/dokument/${id}`).then((res) => res.text());

export const getJsonDocument = (id: string): Promise<DocumentStatus<UnknownDocumentStatus>> =>
  fetch(`${parliamentURL}/dokument/${id}.json`).then((res) => res.json());

export const searchDocument = (query: ParsedUrlQuery): Promise<DocumentList> =>
  fetch(`${parliamentURL}/dokumentlista/?${stringify(query)}`).then((res) => res.json());

export const getMemberDocuments = (id: string, page: number): Promise<MemberDocuments> =>
  fetch(
    `${parliamentURL}/dokumentlista/?avd=dokument&sort=datum&sortorder=datum&utformat=json&iid=${id}&p=${page}`
  )
    .then((res) => res.json())
    .then(serializeMemberDocuments);

export const jsonDocumentController = async (id: string): Promise<DocumentResponse> => {
  const [jsonData, htmlData] = await Promise.all([getJsonDocument(id), getHtmlDocument(id)]);

  return { html: htmlData, ...jsonData };
};

export const documentController = (id: string): Promise<string> => {
  return getHtmlDocument(id);
};

export const memberDocumentsController = (id: string, page?: string): Promise<MemberDocuments> => {
  return getMemberDocuments(id, parseInt(page as string, 10));
};
