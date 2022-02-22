import React, { useState } from 'react';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

import { MembersFilter, MemberList } from '../components/MemberList';

import { MemberList as MemberListType } from '../types/member';
import { PartyAbbreviation } from '../utils/parties';

interface Props {
  members: MemberListType;
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
        <Grid container spacing={3} justifyContent="center">
          <MemberList members={members} filter={filter} />
        </Grid>
      </Container>
      <MembersFilter state={filter} setState={setFilter} />
    </div>
  );
};

export default Members;
