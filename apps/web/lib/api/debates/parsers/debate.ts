import type { DocumentStatus } from "@lib/api/parliament/types";
import type { DebateEntry } from "../types";
import getSpeaker from "../get-speaker";

export default async function parseDebate(
  data: DocumentStatus,
): Promise<DebateEntry> {
  const { dokument: document, dokintressent: participants } =
    data.dokumentstatus;
  const {
    dok_id: id,
    titel: title,
    subtitel: subtitle,
    debattnamn: type,
    datum: date,
  } = document;

  if (participants) {
    const senderId = participants.intressent.find(
      (e) => e.roll === "undertecknare",
    )?.intressent_id;
    const answererId = participants.intressent.find(
      (e) => e.roll === "besvaradav",
    )?.intressent_id;
    const recipientId = participants.intressent.find(
      (e) => e.roll === "stalldtill",
    )?.intressent_id;

    const senderPromise = senderId ? getSpeaker(senderId) : undefined;
    const answererPromise = answererId ? getSpeaker(answererId) : undefined;
    const recipientPromise = recipientId ? getSpeaker(recipientId) : undefined;
  }

  const webTVUrl = `https://www.riksdagen.se/views/pages/embedpage.aspx?did=${id}`;

  return {
    id,
    title,
    subtitle,
    type,
    date,
    webTVUrl,
  };
}
