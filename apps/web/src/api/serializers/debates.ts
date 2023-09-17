import type {
  Debate,
  DebateListEntry,
  DebateListResponse,
  Participant,
} from "../../types/debate";
import type {
  DocumentList,
  DocumentListEntry,
  DocumentParticipant,
  Statement,
} from "../../types/parliament";
import type { PartyAbbreviation } from "../../utils/parties";

const statementSerializer = (data: Statement): Debate => {
  return {
    party: data.parti,
    parentId: data.parent_ardome_id,
    thumbnail: data.tumnagel,
    thumbnailLarge: data.tumnagel_stor,
    id: data.ardome_id,
    thumbnailUrl: data.thumbnail_url,
    number: data.anf_nummer,
    dateTime: data.anf_datumtid,
    time: data.anf_klockslag,
    seconds: data.anf_sekunder,
    speaker: data.talare,
    videoUrl: data.video_url,
    personId: data.intressent_id,
    text: data.anf_text,
  };
};

export const participantSerializer = (
  data: DocumentParticipant,
): Participant => {
  return {
    id: data.intressent_id,
    name: data.namn,
    party: data.partibet as PartyAbbreviation,
  };
};

export const debateListEntrySerializer = (
  data: DocumentListEntry,
): DebateListEntry => {
  const {
    titel: title,
    organ: authority,
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
  let participants: DebateListEntry["participants"] = undefined;
  if (dokintressent != null) {
    const sender = dokintressent.intressent.find(
      (e) => e.roll === "undertecknare",
    );
    const answerer = dokintressent.intressent.find(
      (e) => e.roll === "besvaradav",
    );
    const recipient = dokintressent.intressent.find(
      (e) => e.roll === "stalldtill",
    );

    participants = {
      sender: !!sender ? participantSerializer(sender) : undefined,
      answerer: !!answerer ? participantSerializer(answerer) : undefined,
      recipient: !!recipient ? participantSerializer(recipient) : undefined,
    };
  }

  const debate = Array.isArray(statements)
    ? statements.map(statementSerializer)
    : [statementSerializer(statements)];
  const webTVIds = [...new Set(debate.map((statement) => statement.parentId))];

  return {
    title,
    authority,
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
    participants,
    date,
    systemDate,
  };
};

export const debatesSerializer = (data: DocumentList): DebateListResponse => {
  const { dokumentlista } = data;
  const { dokument: document } = dokumentlista;

  const pages = parseInt(dokumentlista["@sidor"], 10);

  if (!document || pages === 0) {
    return { debates: [], pages };
  }

  const serializedDebates: Array<DebateListEntry> = document.map(
    debateListEntrySerializer,
  );
  return {
    debates: serializedDebates,
    pages,
  };
};
