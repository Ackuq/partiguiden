import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { withRouter } from 'next/router';
import { object } from 'prop-types';

import Filter, { reducer } from '../../components/Filter';
import { FilterProvider } from '../../components/FilterContainer';
import RiksdagsbeslutList from './components/RiksdagsbeslutList';
import styles from './styles';

const useStyles = makeStyles(styles);

const Riksdagsbeslut = ({ router }) => {
  const classes = useStyles();
  return (
    <FilterProvider initialState={{ org: [], search: router.query.sok || '' }} reducer={reducer}>
      <div className={classes.beslutListContainer}>
        <div className={classes.beslutPageContainer} id="beslut-container">
          <RiksdagsbeslutList />
        </div>
        <Filter />
      </div>
    </FilterProvider>
  );
};

Riksdagsbeslut.propTypes = {
  router: object.isRequired
};

export default withRouter(Riksdagsbeslut);
