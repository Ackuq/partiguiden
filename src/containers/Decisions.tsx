import React from 'react';
import { Container } from '@material-ui/core';

import Filter, { reducer } from '../components/ParlimentFilter';
import { FilterProvider } from '../components/Filter';
import RiksdagsbeslutList from '../components/DecisionList';

const Decisions: React.FC<{ query: any }> = ({ query }) => {
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

export default Decisions;
