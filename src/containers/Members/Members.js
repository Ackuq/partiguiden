import React from 'react';
import { Container, Box, Grid } from '@material-ui/core';
import { withRouter } from 'next/router';
import { object, array } from 'prop-types';

import reducer from './reducer';
import { FilterProvider } from '../../components/FilterContainer';
import FilterMembers from './components/FilterMembers';
import MemberList from './components/MemberList';

const Members = ({ router, members }) => {
  const getPartyQuery = () =>
    Array.isArray(router.query.party) ? router.query.party : [router.query.party];

  const initialParties = router.query.party ? getPartyQuery() : [];

  return (
    <FilterProvider initialState={{ parties: initialParties }} reducer={reducer}>
      <Box display="flex">
        <Container>
          <Grid container spacing={3} justify="center">
            <MemberList members={members} />
          </Grid>
        </Container>
        <FilterMembers />
      </Box>
    </FilterProvider>
  );
};

Members.propTypes = {
  router: object.isRequired,
  members: array.isRequired,
};

export default withRouter(Members);
