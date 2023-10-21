import type {
  DocumentList,
  DocumentListEntry,
} from "@lib/api/parliament/types";
import { Committee } from "@lib/committees";

import getVoteResult from "../get-vote-results";
import type { VoteList, VoteListEntry } from "../types";
import titleTrim from "../utils/title-trim";

async function parseVote(
  data: DocumentListEntry,
): Promise<VoteListEntry | undefined> {
  const { beteckning: denomination, id } = data;
  const title: string = titleTrim(data.sokdata.titel);
  const proposition = parseInt(data.tempbeteckning, 10);

  const documentId = `${id.substring(0, 2)}01${denomination.split("p")[0]}`;

  const committee = Object.values(Committee).includes(data.organ as Committee)
    ? (data.organ as Committee)
    : undefined;

  const voteResult = await getVoteResult(documentId, proposition);

  if (voteResult === undefined) {
    return;
  }

  return {
    title,
    committee,
    documentId,
    proposition,
    ...voteResult,
  };
}

export function parseVotes(data: DocumentList): Promise<VoteList> {
  const { dokumentlista: document } = data;

  const pages = parseInt(document["@sidor"], 10);

  const votes = document.dokument;

  if (!votes || pages === 0) {
    return Promise.resolve({
      pages,
      votes: [],
    });
  }

  const votesPromises = votes.map(parseVote);

  return Promise.all(votesPromises).then((votes) => ({
    pages,
    votes: votes.filter((vote): vote is VoteListEntry => vote !== undefined),
  }));
}
