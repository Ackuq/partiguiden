import React from 'react';
import { withRouter } from 'next/router';

import PartyComponent from './components/PartyComponent';
import LoadCircle from '../../LoadCircle';

const Subject = ({ loading, partyData }) => (
  <React.Fragment>
    {loading ? (
      <LoadCircle />
    ) : (
      partyData.map(party => <PartyComponent key={party.name} party={party} />)
    )}
  </React.Fragment>
);

export default withRouter(Subject);
