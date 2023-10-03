import { PARLIAMENT_BASE_URL } from "@lib/constants";
import type { Vote } from "./types";
import stripJsonComments from "strip-json-comments";
import parseVote from "./parsers/vote";

export default async function getVote(
  id: string,
  proposition: number,
): Promise<Vote | undefined> {
  const response = await fetch(
    `${PARLIAMENT_BASE_URL}/dokumentstatus/${id}.json`,
  );
  if (response.status === 404) {
    return undefined;
  }
  if (!response.ok) {
    throw new Error("Något gick fel med anropet till riksdagens API");
  }

  const text = await response.text();
  const data = JSON.parse(stripJsonComments(text));

  return parseVote(data, proposition);
}
