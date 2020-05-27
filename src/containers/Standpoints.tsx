import React from 'react';

import PartyComponent from '../components/PartyOpinions';
import { PartySubject } from '../types/party.d';

interface Props {
  partyData: Array<PartySubject>;
}

const Subject: React.FC<Props> = ({ partyData }) => (
  <>
    {partyData.map((party) => (
      <PartyComponent key={party.name} party={party} />
    ))}
  </>
);

export default Subject;
