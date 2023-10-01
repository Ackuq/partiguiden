import type {
  DocumentList,
  DocumentListEntry,
} from "@lib/api/parliament/types";
import type { VoteList, VoteListEntry } from "../types";
import titleTrim from "../utilts/title-trim";
import getVoteResult from "../get-vote-results";
import { Committee } from "@lib/committes";

async function parseVote(data: DocumentListEntry): Promise<VoteListEntry> {
  const { beteckning: denomination, id } = data;
  const title: string = titleTrim(data.sokdata.titel);
  const proposition = parseInt(data.tempbeteckning, 10);

  const documentId = `${id.substring(0, 2)}01${denomination.split("p")[0]}`;

  const committee = Object.values(Committee).includes(data.organ)
    ? data.organ
    : undefined;

  const { results, subtitle } = await getVoteResult(documentId, proposition);

  return { title, results, committee, documentId, proposition, subtitle };
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
    votes,
  }));
}
