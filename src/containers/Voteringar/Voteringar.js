import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { withRouter } from 'next/router';
import { object } from 'prop-types';

import Filter, { reducer } from '../../components/Filter';
import { FilterProvider } from '../../components/FilterContainer';
import VoteringList from './components/VoteringList';
import styles from './styles';

const useStyles = makeStyles(styles);

const Voteringar = ({ router }) => {
  const classes = useStyles();

  return (
    <FilterProvider initialState={{ org: [], search: router.query.sok || '' }} reducer={reducer}>
      <div className={classes.VoteringListContainer}>
        <div className={`VoteringPage ${classes.voteringarPageContainer}`}>
          <VoteringList />
        </div>
        <Filter />
      </div>
    </FilterProvider>
  );
};

Voteringar.propTypes = {
  router: object.isRequired
};

export default withRouter(Voteringar);
