import {
  NewVotingRow,
  NewVotingTable,
  OldVotingRow,
  OldVotingTable,
  VoteDocumentStatus,
  VotingTable,
} from '../../types/parliament';
import { Vote, VoteResultsResponse } from '../../types/voting';
import { createReferences, extractVotes, getMaxVote } from '../helpers/voteUtils';

export const getVotingRow = (votingTable: VotingTable): NewVotingRow[] | OldVotingRow => {
  if ((<NewVotingTable>votingTable).tbody !== undefined) {
    return (<NewVotingTable>votingTable).tbody.tr;
  }
  return (<OldVotingTable>votingTable).tr;
};

export const voteSerializer = (data: VoteDocumentStatus, propositionNr: number): Vote => {
  const { dokumentstatus } = data;
  const { utskottsforslag: unparsedProposition } = dokumentstatus.dokutskottsforslag;

  const authority = dokumentstatus.dokument.organ;
  const proposition = Array.isArray(unparsedProposition)
    ? unparsedProposition[propositionNr - 1]
    : unparsedProposition;

  const { processedDocuments, propositionText } = createReferences(
    proposition.forslag,
    dokumentstatus.dokreferens.referens
  );

  const { uppgift } = dokumentstatus.dokuppgift;

  const decision = uppgift.find((el) => {
    return el.kod === 'rdbeslut';
  });

  const description = uppgift.find((el) => {
    return el.kod === 'notis';
  });

  const title = uppgift.find((el) => {
    return el.kod === 'notisrubrik';
  });

  const { table } = proposition.votering_sammanfattning_html;
  const singleTable = Array.isArray(table) ? table[table.length - 1] : table;
  const tableRow = getVotingRow(singleTable);

  return {
    title: title?.text ?? '',
    description: description?.text ?? '',
    authority,
    propositionText,
    processedDocuments,
    appendix: dokumentstatus.dokbilaga ? dokumentstatus.dokbilaga.bilaga : [],
    decision: decision ? decision.text : '',
    voting: extractVotes(tableRow),
  };
};

export const voteResultSerializer = (
  data: VoteDocumentStatus,
  num: number
): VoteResultsResponse => {
  const { dokumentstatus } = data;
  const { utskottsforslag } = dokumentstatus.dokutskottsforslag;
  const voteObject = Array.isArray(utskottsforslag) ? utskottsforslag[num - 1] : utskottsforslag;

  const { table } = voteObject.votering_sammanfattning_html;
  const singleTable = Array.isArray(table) ? table[table.length - 1] : table;
  const tableRow = getVotingRow(singleTable);

  return {
    results: getMaxVote(extractVotes(tableRow)),
    subtitle: voteObject.rubrik,
  };
};
