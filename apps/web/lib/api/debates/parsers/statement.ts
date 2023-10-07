import type { DocumentListSpeeches } from "@lib/api/parliament/types";
import type { Debate } from "../types";

export default function parseStatement(data: DocumentListSpeeches): Debate {
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
}
