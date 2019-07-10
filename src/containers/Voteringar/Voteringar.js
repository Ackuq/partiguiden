import React from 'react';
import { Container, Box } from '@material-ui/core';
import { withRouter } from 'next/router';
import { object } from 'prop-types';

import Filter, { reducer } from '../../components/Filter';
import { FilterProvider } from '../../components/FilterContainer';
import VoteringList from './components/VoteringList';

const Voteringar = ({ router }) => {
  let initialOrg = [];
  if (router.query.org) {
    initialOrg = Array.isArray(router.query.org) ? router.query.org : [router.query.org];
  }
  return (
    <FilterProvider
      initialState={{ org: initialOrg, search: router.query.sok || '' }}
      reducer={reducer}
    >
      <Box display="flex">
        <Container>
          <VoteringList />
        </Container>
        <Filter />
      </Box>
    </FilterProvider>
  );
};

Voteringar.propTypes = {
  router: object.isRequired
};

export default withRouter(Voteringar);
