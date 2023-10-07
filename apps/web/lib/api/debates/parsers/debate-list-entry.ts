import type { DocumentListEntry } from "@lib/api/parliament/types";
import type { DebateListEntry } from "../types";
import parseStatement from "./statement";
import { Committee } from "@lib/committes";
import getMember from "@lib/api/member/get-member";

export default async function parseDebateListEntry(
  data: DocumentListEntry,
): Promise<DebateListEntry> {
  const {
    titel: title,
    organ,
    id,
    rm: session,
    beteckning: denomination,
    notis: paragraph,
    notisrubrik: paragraphTitle,
    undertitel: subtitle,
    dokument_url_text: textUrl,
    debattnamn: debateName,
    debatt: { anforande: statements },
    dokintressent,
    datum: date,
    systemdatum: systemDate,
  } = data;
  let sender: DebateListEntry["sender"] = undefined;
  if (dokintressent != null) {
    const senderId = dokintressent.intressent.find(
      (e) => e.roll === "undertecknare",
    )?.intressent_id;

    sender = senderId ? await getMember(senderId) : undefined;
  }

  const debate = Array.isArray(statements)
    ? statements.map(parseStatement)
    : [parseStatement(statements)];
  const webTVIds = [...new Set(debate.map((statement) => statement.parentId))];
  const committee = Object.values(Committee).includes(organ)
    ? organ
    : undefined;

  return {
    title,
    committee,
    subtitle,
    id,
    session,
    denomination,
    paragraph,
    paragraphTitle,
    textUrl,
    webTVIds,
    debate,
    debateName,
    sender,
    date,
    systemDate,
  };
}
