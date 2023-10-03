import type { VoteDocumentStatus } from "@lib/api/parliament/types";
import type { Vote } from "../types";
import createReferences from "../utils/create-references";
import parseVoteResult from "./vote-result";
import { Committee } from "@lib/committes";

export default function parseVote(
  data: VoteDocumentStatus,
  propositionNr: number,
): Vote | undefined {
  const voteResult = parseVoteResult(data, propositionNr);
  if (!voteResult) {
    return;
  }
  const { allVotes } = voteResult;

  const {
    dokumentstatus: {
      dokutskottsforslag: { utskottsforslag },
      dokument: { organ },
      dokreferens: { referens },
      dokuppgift: { uppgift },
      dokbilaga,
    },
  } = data;

  const proposition = Array.isArray(utskottsforslag)
    ? utskottsforslag[propositionNr - 1]
    : utskottsforslag;

  const { processedDocuments, propositionText } = createReferences(
    proposition.forslag,
    referens,
  );

  const decision = uppgift.find((el) => {
    return el.kod === "rdbeslut";
  });

  const description = uppgift.find((el) => {
    return el.kod === "notis";
  });

  const title = uppgift.find((el) => {
    return el.kod === "notisrubrik";
  });

  return {
    title: title?.text ?? "",
    description: description?.text ?? "",
    committee: Object.values(Committee).includes(organ) ? organ : undefined,
    propositionText,
    processedDocuments,
    appendix: dokbilaga ? dokbilaga.bilaga : [],
    decision: decision ? decision.text : "",
    voting: allVotes,
  };
}
