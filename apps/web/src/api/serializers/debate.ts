import type { DebateEntry, DebateStatement } from "../../types/debate";
import type { DocumentList, DocumentListEntry } from "../../types/parliament";
import type { MemberResponse } from "../../types/member";
import type { ParsedUrlQuery } from "querystring";
import { debateListEntrySerializer } from "./debates";
import { getMember } from "../controllers/members";
import { getSpeech } from "../controllers/speech";
import { searchDocument } from "../controllers/document";

const getProtocolId = async (document: DocumentListEntry): Promise<string> => {
  const query: ParsedUrlQuery = {
    doktyp: "prot",
    rm: encodeURIComponent(document.rm),
    from: encodeURIComponent(document.debattdag),
    tom: encodeURIComponent(document.debattdag),
    sort: "rel",
    sortorder: "desc",
    utformat: "json",
  };

  const protocol = await searchDocument(query);
  if (
    !protocol.dokumentlista.dokument ||
    protocol.dokumentlista.dokument.length == 0 ||
    protocol.dokumentlista.dokument.length > 1
  ) {
    throw new Error("No protocol or too many protocols found");
  }
  return protocol.dokumentlista.dokument[0].id;
};

export const debateSerializer = async (
  data: DocumentList,
): Promise<DebateEntry> => {
  const document = data.dokumentlista.dokument?.[0];
  if (document === undefined) {
    throw Error("Document not found");
  }
  const { debate, ...serializedDocument } = debateListEntrySerializer(document);
  let protocolId: string | undefined = undefined;
  try {
    protocolId = await getProtocolId(document);
  } catch {
    // Do nothing
  }

  const speakerPromises: Promise<PromiseSettledResult<MemberResponse>[]> =
    Promise.allSettled(
      [...new Set(debate.map((debate) => debate.personId))].map((person) =>
        getMember(person)
          .then((result) => Promise.resolve(result))
          .catch((err) => Promise.reject(err)),
      ),
    );

  // Some may be corrupted, use allSettled to get the results even if some fail
  // TODO: Better error handling
  const statementPromises: Promise<PromiseSettledResult<DebateStatement>[]> =
    protocolId !== undefined
      ? Promise.allSettled(
          debate.map((debate) =>
            getSpeech(protocolId as unknown as string, debate.number)
              .then((speech) => Promise.resolve({ ...debate, speech }))
              .catch((err) => Promise.reject(err)),
          ),
        )
      : Promise.resolve([]);

  return Promise.all([speakerPromises, statementPromises]).then(
    ([speakers, statements]) => ({
      ...serializedDocument,
      protocolId: protocolId,
      // Filter away the faulty results
      speakers: speakers
        .filter((m) => m.status === "fulfilled")
        .map((m) => (m as PromiseFulfilledResult<MemberResponse>).value)
        .reduce(
          (prev, current) => ({ ...prev, [current.id]: current }),
          {} as Record<string, MemberResponse>,
        ),
      statements: statements
        .filter((s) => s.status === "fulfilled")
        .map((s) => (s as PromiseFulfilledResult<DebateStatement>).value),
    }),
  );
};
