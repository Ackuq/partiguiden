import { DebateEntry, DebateStatement } from '../../types/debate';
import { DocumentList } from '../../types/parliament';
import { MemberResponse } from '../../types/member';
import { debateListEntrySerializer } from './debates';
import { getJsonDocument } from '../controllers/document';
import { getMember } from '../controllers/members';
import { getSpeech } from '../controllers/speech';

const getProtocolId = async (documentId: string): Promise<string> => {
  // TODO: Change this to search based on time instead
  const document = await getJsonDocument(documentId);
  console.log(documentId);
  if (Array.isArray(document.dokumentstatus.dokreferens?.referens)) {
    let protocolId = document.dokumentstatus.dokreferens?.referens.find(
      (reference) => reference.referenstyp === 'protokolldebatt'
    );

    if (protocolId === undefined) {
      // If the protocol is not directly found, try to find the document of list of participants
      protocolId = document.dokumentstatus.dokreferens?.referens.find(
        (reference) => reference.ref_dok_typ === 'prot'
      );
      if (protocolId !== undefined) {
        // TODO: Replacement value depends on the type of debate
        protocolId.ref_dok_id =
          protocolId.ref_dok_id.slice(0, 2) + '09' + protocolId.ref_dok_id.slice(4);
      }
    }

    if (protocolId === undefined) {
      throw new Error(`No protocol found for document with id ${documentId}`);
    }
    return protocolId.ref_dok_id;
  }
  if (document.dokumentstatus.dokreferens?.referens == null) {
    throw new Error(`No protocol found for document with id ${documentId}`);
  }
  return document.dokumentstatus.dokreferens.referens.ref_dok_id;
};

export const debateSerializer = async (data: DocumentList): Promise<DebateEntry> => {
  const document = data.dokumentlista.dokument?.[0];
  if (document === undefined) {
    throw Error('Document not found');
  }
  const { debate, ...serializedDocument } = debateListEntrySerializer(document);
  const protocolId = await getProtocolId(document.id);

  const speakerPromises: Promise<MemberResponse[]> = Promise.all(
    [...new Set(debate.map((debate) => debate.personId))].map((person) => getMember(person))
  );
  const statementPromises: Promise<DebateStatement[]> = Promise.all(
    debate.map(
      (debate) =>
        new Promise<DebateStatement>((resolve) => {
          getSpeech(protocolId, debate.number).then((speech) => resolve({ ...debate, speech }));
        })
    )
  );

  return Promise.all([speakerPromises, statementPromises]).then(([speakers, statements]) => ({
    ...serializedDocument,
    protocolId: protocolId,
    speakers: speakers.reduce(
      (prev, current) => ({ ...prev, [current.id]: current }),
      {} as Record<string, MemberResponse>
    ),
    statements,
  }));
};
