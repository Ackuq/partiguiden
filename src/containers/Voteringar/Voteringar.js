import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import VoteringList from './components/VoteringList';
import Filter from '../../components/Filter';
import styles from './styles';

const Voteringar = ({ classes }) => (
  <div className={classes.VoteringListContainer}>
    <div className={`VoteringPage ${classes.voteringarPageContainer}`}>
      <VoteringList />
    </div>
    <Filter />
  </div>
);

export default withStyles(styles)(Voteringar);
