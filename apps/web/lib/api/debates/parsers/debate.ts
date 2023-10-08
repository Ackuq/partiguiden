import type { DocumentList } from "@lib/api/parliament/types";
import type { Debate, DebateStatement } from "../types";
import getSpeaker from "../get-speaker";
import getProtocols from "@lib/api/parliament/get-protocols";
import getSpeech from "../get-speech";

export default async function parseDebate(
  data: DocumentList,
): Promise<Debate | undefined> {
  const document = data.dokumentlista.dokument?.[0];

  if (!document) {
    return;
  }

  const {
    dok_id: id,
    titel: title,
    undertitel: subtitle,
    debattnamn: type,
    datum: date,
  } = document;

  const protocols = await getProtocols({
    rm: document.rm,
    from: document.debattdag,
    to: document.debattdag,
  });
  const protocolId = protocols?.dokumentlista.dokument?.[0].id;

  const senderId = document.dokintressent?.intressent.find(
    (intressent) => intressent.roll === "undertecknare",
  )?.intressent_id;

  const speechesPromises: Promise<DebateStatement>[] = protocolId
    ? document.debatt?.anforande?.map((statement) =>
        getSpeech(protocolId, statement.anf_nummer).then((data) => {
          if (!data) {
            return Promise.reject();
          }
          return {
            ...data,
            number: statement.anf_nummer,
            date: statement.anf_datumtid,
          };
        }),
      ) ?? []
    : [];

  const speakerIds = new Set(
    document.debatt?.anforande.map((speech) => speech.intressent_id),
  );
  const speakerPromises = [...speakerIds].map(getSpeaker);

  const webTVUrl = `https://www.riksdagen.se/views/pages/embedpage.aspx?did=${id}`;

  const [speakerList, speechesList] = await Promise.all([
    Promise.allSettled(speakerPromises),
    Promise.allSettled(speechesPromises),
  ]);

  const speakers = speakerList.reduce((prev, current) => {
    if (current.status === "rejected" || current.value === undefined) {
      return prev;
    }
    return { ...prev, [current.value.id]: current.value };
  }, {});

  const statements = speechesList
    .filter(
      (speech): speech is PromiseFulfilledResult<DebateStatement> =>
        speech.status === "fulfilled",
    )
    .map((speech) => speech.value);

  return {
    id,
    title,
    subtitle,
    type,
    date,
    webTVUrl,
    senderId,
    speakers,
    statements,
  };
}
