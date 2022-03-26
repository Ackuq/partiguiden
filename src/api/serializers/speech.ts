import { Speech } from '../../types/debate';
import { StatementDocument } from '../../types/parliament';

export const speechSerializer = ({ anforande: statement }: StatementDocument): Speech => {
  return {
    speakerId: statement.intressent_id,
    speaker: statement.talare,
    text: statement.anforandetext,
    number: statement.anforande_nummer,
    date: statement.systemdatum,
  };
};
