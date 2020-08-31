import React from 'react';
import { useRouter } from 'next/router';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

import { MembersFilter, MemberList } from '../components/MemberList';
import { queryAttrToString, queryAttrToArray } from '../utils';

import { Member } from '../types/member';

interface Props {
  members: Array<Member>;
}

const Members: React.FC<Props> = ({ members }) => {
  const router = useRouter();
  const search = queryAttrToString(router.query.search);
  const parties = queryAttrToArray(router.query.party);

  return (
    <div style={{ display: 'flex' }}>
      <Container>
        <Grid container spacing={3} justify="center">
          <MemberList members={members} parties={parties} search={search} />
        </Grid>
      </Container>
      <MembersFilter router={router} parties={parties} search={search} />
    </div>
  );
};

export default Members;
