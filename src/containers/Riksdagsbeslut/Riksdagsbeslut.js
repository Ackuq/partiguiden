import React from 'react';
import { makeStyles } from '@material-ui/styles';

import Filter from '../../components/Filter';
import RiksdagsbeslutList from './components/RiksdagsbeslutList';
import styles from './styles';

const useStyles = makeStyles(styles);

const Riksdagsbeslut = () => {
  const classes = useStyles();
  return (
    <div className={classes.beslutListContainer}>
      <div className={classes.beslutPageContainer} id="beslut-container">
        <RiksdagsbeslutList />
      </div>
      <Filter />
    </div>
  );
};

export default Riksdagsbeslut;
