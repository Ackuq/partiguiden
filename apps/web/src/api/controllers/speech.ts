import { Speech } from '../../types/debate';
import { parliamentURL } from '../constants';
import { speechSerializer } from '../serializers/speech';

export const getSpeech = (protocolId: string, number: string): Promise<Speech> =>
  fetch(`${parliamentURL}/anforande/${protocolId}-${number}/json`)
    .then((res) => res.json())
    .then(speechSerializer);

export const speechController = async (protocolId: string, number: string) => {
  return getSpeech(protocolId, number);
};
