import stripJsonComments from "strip-json-comments";

import { PARLIAMENT_BASE_URL } from "@lib/constants";

import parseVoteResult from "./parsers/vote-result";
import type { VoteResultsResponse } from "./types";

export default async function getVoteResult(
  id: string,
  num: number,
): Promise<VoteResultsResponse | undefined> {
  const response = await fetch(
    `${PARLIAMENT_BASE_URL}/dokumentstatus/${id}.json`,
  );
  const text = await response.text();
  const data = JSON.parse(stripJsonComments(text));

  return parseVoteResult(data, num);
}
