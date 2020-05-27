import { partyAbbrev } from '../../../types/party.d';
import { votingEntry } from '../../../types/voting.d';

type key = partyAbbrev | '-' | 'Totalt';

interface Result {
  name: string;
  Ja: string;
  Nej: string;
  Avstående: string;
  Frånvarande: string;
}

export default (voting: Record<key, votingEntry>) => {
  const result: Result[] = [];

  (Object.keys(voting) as key[]).forEach((party) => {
    if (party !== '-' && party !== 'Totalt') {
      result.push({
        name: party,
        Ja: voting[party].ja,
        Nej: voting[party].nej,
        Avstående: voting[party].avstaende,
        Frånvarande: voting[party].franvarande,
      });
    }
  });
  return result;
};
