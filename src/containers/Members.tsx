import React, { useState } from 'react';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

import { MembersFilter, MemberList } from '../components/MemberList';

import { Member } from '../types/member';
import { PartyAbbreviation } from '../types/party';

interface Props {
  members: Array<Member>;
}

interface FilterState {
  search: string;
  parties: Array<PartyAbbreviation>;
}

const Members: React.FC<Props> = ({ members }) => {
  const [filter, setFilter] = useState<FilterState>({ search: '', parties: [] });

  return (
    <div style={{ display: 'flex' }}>
      <Container>
        <Grid container spacing={3} justify="center">
          <MemberList members={members} filter={filter} />
        </Grid>
      </Container>
      <MembersFilter state={filter} setState={setFilter} />
    </div>
  );
};

export default Members;
