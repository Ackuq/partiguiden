import React from 'react';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

import reducer from './reducer';
import { FilterProvider } from '../../components/Filter';
import FilterMembers from './components/FilterMembers';
import MemberList from './components/MemberList';

const Members: React.FC<{ query: any }> = ({ query }) => {
  const getPartyQuery = () => (Array.isArray(query.party) ? query.party : [query.party]);

  const initialParties = query.party ? getPartyQuery() : [];

  return (
    <FilterProvider
      initialState={{ parties: initialParties, search: query.sok || '' }}
      reducer={reducer}
    >
      <div style={{ display: 'flex' }}>
        <Container>
          <Grid container spacing={3} justify="center">
            <MemberList />
          </Grid>
        </Container>
        <FilterMembers />
      </div>
    </FilterProvider>
  );
};

export default Members;
