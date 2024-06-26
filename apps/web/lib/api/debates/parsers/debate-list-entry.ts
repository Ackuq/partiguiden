import type { DocumentListEntry } from "@lib/api/parliament/types";
import { Committee } from "@lib/committees";

import getSpeaker from "../get-speaker";
import type { DebateListEntry } from "../types";

export default async function parseDebateListEntry(
  data: DocumentListEntry,
): Promise<DebateListEntry> {
  const {
    dok_id: id,
    titel: title,
    organ,
    undertitel: subtitle,
    debattnamn: type,
    dokintressent,
    datum: date,
  } = data;
  let sender: DebateListEntry["sender"] = undefined;
  if (dokintressent != null) {
    const senderId = dokintressent.intressent.find(
      (e) => e.roll === "undertecknare",
    )?.intressent_id;

    sender = senderId ? await getSpeaker(senderId) : undefined;
  }

  const committee = Object.values(Committee).includes(organ as Committee)
    ? (organ as Committee)
    : undefined;

  return {
    title,
    committee,
    subtitle,
    id,
    type,
    sender,
    date,
  };
}
