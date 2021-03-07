import React from 'react';

import PartyStandpoints from '../components/PartyStandpoints';
import { partyAbbrev } from '../types/party';
import { StandpointsMap } from '../types/subjects';
import { partiesMap } from '../utils/getParties';

interface Props {
  standpoints: StandpointsMap;
}

const Subject: React.FC<Props> = ({ standpoints }) => (
  <>
    {Object.keys(standpoints).map((party) => (
      <PartyStandpoints
        key={party}
        party={partiesMap[party as partyAbbrev]}
        standpoints={standpoints[party as partyAbbrev]}
      />
    ))}
  </>
);

export default Subject;
