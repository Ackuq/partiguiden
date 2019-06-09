import React from 'react';
import { withStyles } from '@material-ui/core/styles';

// eslint-disable-next-line import/no-cycle
import VoteringListContainer from './VoteringListContainer';
import Filter from '../../../../Filter';

import styles from './styles';

const VoteringList = ({ classes, ...props }) => (
  <div className={`container ${classes.VoteringListContainer}`}>
    <div className={`VoteringPage ${classes.voteringarPageContainer}`}>
      <VoteringListContainer {...props} />
    </div>
    <Filter />
  </div>
);

export default withStyles(styles)(VoteringList);
