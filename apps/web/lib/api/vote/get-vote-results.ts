import stripJsonComments from "strip-json-comments";

import { PARLIAMENT_BASE_URL } from "@lib/constants";
import { parse } from "@lib/utils/json";

import type { DocumentStatus } from "../parliament/types";
import parseVoteResult from "./parsers/vote-result";
import type { VoteResultsResponse } from "./types";

export default async function getVoteResult(
  id: string,
  num: number,
): Promise<VoteResultsResponse | undefined> {
  const response = await fetch(
    `${PARLIAMENT_BASE_URL}/dokumentstatus/${id}.json`,
    {
      cache: "no-store",
    },
  );
  const text = await response.text();
  const data = parse<DocumentStatus>(stripJsonComments(text));

  return parseVoteResult(data, num);
}
