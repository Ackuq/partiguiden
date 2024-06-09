import type { DocumentStatus } from "@lib/api/parliament/types";
import { getCommittee } from "@lib/committees";

import type { Vote } from "../types";
import createReferences from "../utils/create-references";
import parseVoteResult from "./vote-result";

export default function parseVote(
  data: DocumentStatus,
  propositionNr: number,
): Vote | undefined {
  const voteResult = parseVoteResult(data, propositionNr);
  if (!voteResult) {
    return;
  }
  const { allVotes } = voteResult;

  const {
    dokumentstatus: {
      dokutskottsforslag,
      dokument: { dok_id: document_id, organ },
      dokreferens,
      dokuppgift,
      dokbilaga,
    },
  } = data;

  if (!dokutskottsforslag) {
    return;
  }

  const proposition = Array.isArray(dokutskottsforslag.utskottsforslag)
    ? dokutskottsforslag.utskottsforslag[propositionNr - 1]
    : dokutskottsforslag.utskottsforslag;

  const { processedDocuments, propositionText } = createReferences(
    proposition.forslag,
    dokreferens?.referens ?? [],
  );

  const decision = dokuppgift?.uppgift.find((el) => {
    return el.kod === "rdbeslut";
  });

  const description = dokuppgift?.uppgift.find((el) => {
    return el.kod === "notis";
  });

  const title = dokuppgift?.uppgift.find((el) => {
    return el.kod === "notisrubrik";
  });

  return {
    id: document_id,
    title: title?.text ?? "",
    description: description?.text ?? "",
    committee: getCommittee(organ),
    propositionText,
    processedDocuments,
    appendix: dokbilaga ? dokbilaga.bilaga : [],
    decision: decision ? decision.text : "",
    voting: allVotes,
  };
}
