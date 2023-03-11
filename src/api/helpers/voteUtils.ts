import { DocumentReference, NewVotingRow, OldVotingRow } from '../../types/parliament';
import {
  ProcessedDocument,
  VotingDict,
  VotingEntry,
  VotingGroup,
  VotingResult,
  votingGroup,
} from '../../types/voting';

interface ReferencesResponse {
  processedDocuments: ProcessedDocument[];
  propositionText: string;
}

export const createReferences = (
  unparsedProposition: string,
  references: DocumentReference[]
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

const votingGroupRemap = (partyName: string): VotingGroup => {
  switch (partyName) {
    case 'fp':
      return 'L';
    case '-':
      return 'noParty';
    case 'Totalt':
      return 'total';
    default:
      return partyName.toUpperCase() as VotingGroup;
  }
};

const defaultVotingEntry: VotingEntry = {
  yes: 0,
  no: 0,
  abscent: 0,
  refrain: 0,
};

const defaultVotes: VotingDict = votingGroup.reduce(
  (prev, curr) => ({ ...prev, [curr]: defaultVotingEntry }),
  {} as VotingDict
);

export const extractVotesNew = (row: NewVotingRow[]): VotingDict => {
  const voting = {} as VotingDict;

  const total: VotingEntry = defaultVotingEntry;

  row.forEach(({ th, td }) => {
    const votingGroupName = votingGroupRemap(th);
    const partyVotes = {
      yes: +td[0],
      no: +td[1],
      refrain: +td[2],
      abscent: +td[3],
    };
    total['yes'] = total['yes'] + partyVotes['yes'];
    total['no'] = total['no'] + partyVotes['no'];
    total['refrain'] = total['refrain'] + partyVotes['refrain'];
    total['abscent'] = total['abscent'] + partyVotes['abscent'];
    voting[votingGroupName] = partyVotes;
  });
  voting['total'] = total;
  return voting;
};

export const extractVotes = (row: NewVotingRow[] | OldVotingRow | undefined): VotingDict => {
  if (!row) {
    return defaultVotes;
  }
  // New only contains `td`
  if (row.every((col) => Object.hasOwn(col, 'td'))) {
    return extractVotesNew(<NewVotingRow[]>row);
  }
  const voting = {} as VotingDict;
  const [, , ...entries] = <OldVotingRow>row;

  entries.forEach((entry) => {
    const { td } = entry;

    if (Array.isArray(td)) {
      const votingGroupName = votingGroupRemap(td[0]);

      const partyVotes = {
        yes: +td[1],
        no: +td[2],
        refrain: +td[3],
        abscent: +td[4],
      };
      voting[votingGroupName] = partyVotes;
    }
  });

  return voting;
};

const decisions: ['yes', 'no', 'refrain'] = ['yes', 'no', 'refrain'];

export const getMaxVote = (partyVotes: VotingDict): VotingResult => {
  const result: VotingResult = { yes: [], no: [], winner: 'draw' };

  // Want to isolate so just the parties are in the parties constant
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { noParty, total, ...parties } = partyVotes;

  const yesTotal = total.yes;
  const noTotal = total.no;

  /* Get the winner */
  if (yesTotal !== noTotal) {
    result.winner = yesTotal > noTotal ? 'yes' : 'no';
  }

  /* Decide on what parties voted for */
  // eslint-disable-next-line no-restricted-syntax
  for (const [party, votes] of Object.entries(parties)) {
    const vote = decisions.reduce((a, b) => (votes[a] > votes[b] ? a : b));

    if (vote === 'yes' || vote === 'no') {
      result[vote].push(party);
    }
  }

  return result;
};
