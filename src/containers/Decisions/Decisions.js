import React from 'react';
import { Container } from '@material-ui/core';
import { object } from 'prop-types';

import Filter, { reducer } from '../../components/ParlimentFilter';
import { FilterProvider } from '../../components/Filter';
import RiksdagsbeslutList from './components/DecisionList';

const Decisions = ({ query }) => {
  let initialOrg = [];
  if (query.org) {
    initialOrg = Array.isArray(query.org) ? query.org : [query.org];
  }
  return (
    <FilterProvider
      initialState={{
        org: initialOrg,
        search: query.sok || '',
      }}
      reducer={reducer}
    >
      <div style={{ display: 'flex' }}>
        <Container maxWidth="md">
          <RiksdagsbeslutList />
        </Container>
        <Filter />
      </div>
    </FilterProvider>
  );
};

Decisions.propTypes = {
  query: object.isRequired,
};

export default Decisions;
