import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import Filter from '../../components/Filter';
import RiksdagsbeslutList from './components/RiksdagsbeslutList';
import styles from './styles';

const Riksdagsbeslut = ({ classes }) => (
  <div className={classes.beslutListContainer}>
    <div className={classes.beslutPageContainer} id="beslut-container">
      <RiksdagsbeslutList />
    </div>
    <Filter />
  </div>
);

export default withStyles(styles)(Riksdagsbeslut);
