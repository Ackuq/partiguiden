import stripJsonComments from "strip-json-comments";

import { PARLIAMENT_BASE_URL } from "@lib/constants";

import type { DocumentStatus } from "../parliament/types";
import parseVote from "./parsers/vote";
import type { Vote } from "./types";

export default async function getVote(
  id: string,
  proposition: number,
): Promise<Vote | undefined> {
  const response = await fetch(
    `${PARLIAMENT_BASE_URL}/dokumentstatus/${id}.json`,
    {
      cache: "no-store",
    },
  );
  if (response.status === 404) {
    return undefined;
  }
  if (!response.ok) {
    throw new Error("Något gick fel med anropet till riksdagens API");
  }

  const text = await response.text();
  const data = JSON.parse(stripJsonComments(text)) as DocumentStatus;

  return parseVote(data, proposition);
}
