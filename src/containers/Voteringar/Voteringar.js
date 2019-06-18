import React from 'react';
import { makeStyles } from '@material-ui/styles';

import VoteringList from './components/VoteringList';
import Filter from '../../components/Filter';
import styles from './styles';

const useStyles = makeStyles(styles);

const Voteringar = () => {
  const classes = useStyles();

  return (
    <div className={classes.VoteringListContainer}>
      <div className={`VoteringPage ${classes.voteringarPageContainer}`}>
        <VoteringList />
      </div>
      <Filter />
    </div>
  );
};

export default Voteringar;
