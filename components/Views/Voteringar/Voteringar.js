import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import VoteringList from './components/VoteringList';
import Filter from '../../Filter';
import styles from './styles';

const Voteringar = ({ classes }) => (
  <div className={`container ${classes.VoteringListContainer}`}>
    <div className={`VoteringPage ${classes.voteringarPageContainer}`}>
      <VoteringList />
    </div>
    <Filter />
  </div>
);

export default withStyles(styles)(Voteringar);
