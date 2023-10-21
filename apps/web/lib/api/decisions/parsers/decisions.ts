import type {
  DocumentList,
  DocumentListEntry,
} from "@lib/api/parliament/types";
import { Committee } from "@lib/committees";

import type { Decision, Decisions } from "../types";
import checkIfVotesExist from "../utils/check-if-vote-exists";

async function parseDecision(data: DocumentListEntry): Promise<Decision> {
  const {
    titel: title,
    organ,
    id,
    rm: session,
    beteckning: denomination,
    notis: paragraph,
    notisrubrik: paragraphTitle,
    dokument_url_text: textUrl,
  } = data;

  const voteSearchTerm = `${session}:${denomination}`;
  const jsonUrl = `https:${textUrl}`.replace(".text", ".json");
  const votesExists = await checkIfVotesExist(jsonUrl);

  const committee = Object.values(Committee).includes(organ as Committee)
    ? (organ as Committee)
    : undefined;

  return {
    id,
    paragraph,
    paragraphTitle,
    committee,
    denomination,
    title,
    voteSearchTerm,
    votesExists,
  };
}

export default function parseDecisions(data: DocumentList): Promise<Decisions> {
  const { dokumentlista } = data;
  const { dokument: document } = dokumentlista;

  const pages = parseInt(dokumentlista["@sidor"], 10);

  if (!document || pages === 0) {
    return Promise.resolve({ decisions: [], pages });
  }

  const decisionPromises = document.map(parseDecision);

  return Promise.all(decisionPromises).then((decisions) => ({
    decisions,
    pages,
  }));
}
