import {
  ProcessedDocument,
  VotingDict,
  VotingEntry,
  VotingResult,
  VotingRow,
} from '../../types/voting';

interface Reference {
  referenstyp: string;
  uppgift: string | null;
  ref_dok_id: string;
  ref_dok_typ: string;
  ref_dok_rm: string;
  ref_dok_bet: string;
  ref_dok_titel: string;
  ref_dok_subtitel: string | null;
  ref_dok_subtyp: string | null;
  ref_dok_dokumentnamn: string;
}

interface ReferencesResponse {
  processedDocuments: ProcessedDocument[];
  propositionText: string;
}

export const createReferences = (
  unparsedProposition: string,
  references: Array<Reference>
): ReferencesResponse => {
  /* Remove newlines */
  let proposition = unparsedProposition.replace(/(<br>)|<BR\/>/gm, ' ');
  /* Regex to find references in suggestion text */
  /* Matches for example: 2019/20:3635 */
  const referenceRegex = /[0-9]{4}\/[0-9]{2}:[A-ö]{0,4}[0-9]{0,4}/gm;

  const referencedDocuments: Array<string> = [];

  let match;
  // eslint-disable-next-line no-cond-assign
  while ((match = referenceRegex.exec(proposition))) {
    if (!referencedDocuments.includes(match[0])) {
      referencedDocuments.push(match[0]);
    }
  }

  const processedDocuments: Array<ProcessedDocument> = [];

  for (let i = 0; i < referencedDocuments.length; i += 1) {
    const sectionStart = proposition.indexOf(referencedDocuments[i]);
    const sectionEnd =
      i < referencedDocuments.length - 1
        ? proposition.indexOf(referencedDocuments[i + 1])
        : proposition.length;

    const id =
      references.find(
        (reference) => `${reference.ref_dok_rm}:${reference.ref_dok_bet}` === referencedDocuments[i]
      )?.ref_dok_id ?? '';

    const section = proposition.slice(sectionStart, sectionEnd);

    if (section.includes(')')) {
      /* Replace EX: "2019/20:3642 av Helena Lindahl m.fl. (C)"" */
      const endIndex = section.indexOf(')') + 1;
      const label = section.substring(0, endIndex);
      processedDocuments.push({ id, label });

      proposition = proposition.split(label).join(`[${i}]`);
    } else {
      /* Just replace the ID, EX: "2019/20:3642" */
      processedDocuments.push({
        id,
        label: referencedDocuments[i],
      });
      proposition = proposition.split(referencedDocuments[i]).join(`[${i}]`);
    }
  }

  return {
    processedDocuments,
    propositionText: proposition,
  };
};

export const titleTrim = (title: string): string =>
  title.split(/([0-9]{4}\/[0-9]{2}:[A-ö]{0,4}[0-9]{0,4})/)[2].trim();

export const extractVotes = (row: VotingRow): Record<string, VotingEntry> => {
  const voting: Record<string, VotingEntry> = {};

  const [, , ...entries] = row;

  entries.forEach((entry) => {
    const { td } = entry;
    if (Array.isArray(td)) {
      const partyVotes = {
        yes: td[1],
        no: td[2],
        refrain: td[3],
        abscent: td[4],
      };
      voting[td[0]] = partyVotes;
    }
  });

  return voting;
};

const decisions: ['yes', 'no', 'refrain'] = ['yes', 'no', 'refrain'];

export const getMaxVote = (partyVotes: VotingDict): VotingResult => {
  const result: VotingResult = { yes: [], no: [], winner: 'draw' };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { '-': noParty, Totalt: total, ...parties } = partyVotes;

  const yesTotal = parseInt(total.yes, 10);
  const noTotal = parseInt(total.no, 10);

  /* Get the winner */
  if (yesTotal !== noTotal) {
    result.winner = yesTotal > noTotal ? 'yes' : 'no';
  }

  /* Decide on what parties voted for */
  // eslint-disable-next-line no-restricted-syntax
  for (const [party, votes] of Object.entries(parties)) {
    const vote = decisions.reduce((a, b) =>
      parseInt(votes[a], 10) > parseInt(votes[b], 10) ? a : b
    );

    if (vote === 'yes' || vote === 'no') {
      result[vote].push(party);
    }
  }

  return result;
};
