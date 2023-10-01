import { PARLIAMENT_BASE_URL } from "@lib/constants";
import stripJsonComments from "strip-json-comments";
import type { VoteResultsResponse } from "./types";
import parseVoteResult from "./parsers/vote-result";

export default async function getVoteResult(
  id: string,
  num: number,
): Promise<VoteResultsResponse> {
  const response = await fetch(
    `${PARLIAMENT_BASE_URL}/dokumentstatus/${id}.json`,
  );
  const text = await response.text();
  const data = JSON.parse(stripJsonComments(text));

  return parseVoteResult(data, num);
}
