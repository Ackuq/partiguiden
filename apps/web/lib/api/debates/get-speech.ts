import { PARLIAMENT_BASE_URL } from "@lib/constants";
import { body } from "@lib/utils/json";

import type { SpeechDocumentResponse } from "../parliament/types/speech";
import parseSpeech from "./parsers/speech";
import type { Speech } from "./types";

export default async function getSpeech(
  protocol: string,
  number: string,
): Promise<Speech | undefined> {
  const response = await fetch(
    `${PARLIAMENT_BASE_URL}/anforande/${protocol}-${number}.json`,
    {
      next: {
        revalidate: 60 * 60 * 24 * 7,
      },
    },
  );
  if (!response.ok) {
    return;
  }

  const data = await body<SpeechDocumentResponse>(response);
  return parseSpeech(data);
}
