import type { SpeechDocumentResponse } from "@lib/api/parliament/types/speech";
import type { Speech } from "../types";

export default function parseSpeech(response: SpeechDocumentResponse): Speech {
  const {
    parti: party,
    intressent_id: speakerId,
    talare: speaker,
    anforandetext: text,
  } = response.anforande;
  return {
    speakerId,
    speaker,
    text,
    party,
  };
}
