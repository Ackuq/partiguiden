import React from 'react';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

import { FilterProvider } from '../components/Filter';
import { MembersFilter, MemberList, reducer } from '../components/MemberList';

interface Props {
  query: {
    party: Array<string> | string;
    sok: string;
  };
}

const Members: React.FC<Props> = ({ query }) => {
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
        <MembersFilter />
      </div>
    </FilterProvider>
  );
};

export default Members;
