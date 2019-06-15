import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import Filter from '../../components/Filter';
import RiksdagsbeslutList from './components/RiksdagsbeslutList';
import styles from './styles';

const Riksdagsbeslut = ({ classes }) => (
  <React.Fragment>
    <div className={`container ${classes.beslutListContainer}`}>
      <div className={classes.beslutPageContainer} id="beslut-container">
        <RiksdagsbeslutList />
      </div>
      <Filter />
    </div>
  </React.Fragment>
);

export default withStyles(styles)(Riksdagsbeslut);
