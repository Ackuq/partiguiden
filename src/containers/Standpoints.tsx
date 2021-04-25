import React from 'react';

import PartyStandpoints from '../components/PartyStandpoints';
import { PartyAbbreviation } from '../utils/parties';
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
        party={partiesMap[party as PartyAbbreviation]}
        standpoints={standpoints[party as PartyAbbreviation]}
      />
    ))}
  </>
);

export default Subject;
