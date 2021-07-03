import { getMaxVote, extractVotes, createReferences } from '../helpers/voteUtils';
import { Vote, VoteResultsResponse } from '../../types/voting';

export const voteSerializer = (data: any, propositionNr: number): Vote => {
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

  const decision = uppgift.find((el: any) => {
    return el.kod === 'rdbeslut';
  });

  const description = uppgift.find((el: any) => {
    return el.kod === 'notis';
  });

  const title = uppgift.find((el: any) => {
    return el.kod === 'notisrubrik';
  });

  const { table } = proposition.votering_sammanfattning_html;
  const tableRow = Array.isArray(table) ? table[table.length - 1].tr : table.tr;

  return {
    title: title.text,
    description: description.text,
    authority,
    propositionText,
    processedDocuments,
    appendix: dokumentstatus.dokbilaga ? dokumentstatus.dokbilaga.bilaga : null,
    decision: decision ? decision.text : '',
    voting: extractVotes(tableRow),
  };
};

export const voteResultSerializer = (data: any, num: number): VoteResultsResponse => {
  const { dokumentstatus } = data;
  const { utskottsforslag } = dokumentstatus.dokutskottsforslag;
  const voteObject = Array.isArray(utskottsforslag) ? utskottsforslag[num - 1] : utskottsforslag;

  const { table } = voteObject.votering_sammanfattning_html;
  const tableRow = Array.isArray(table) ? table[table.length - 1].tr : table.tr;

  return {
    results: getMaxVote(extractVotes(tableRow)),
    subtitle: voteObject.rubrik,
  };
};
