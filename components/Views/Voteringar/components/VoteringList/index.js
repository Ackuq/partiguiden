import React from 'react';
// eslint-disable-next-line import/no-cycle
import VoteringListContainer from './VoteringListContainer';
import Filter from '../../../../Filter';

const VoteringList = props => (
  <React.Fragment>
    <div className="container">
      <VoteringListContainer {...props} />
    </div>
    <Filter {...props} />
  </React.Fragment>
);

export default VoteringList;
