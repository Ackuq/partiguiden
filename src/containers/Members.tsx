import React from 'react';
import { useRouter } from 'next/router';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

import { MembersFilter, MemberList } from '../components/MemberList';
import { queryAttrToString, queryAttrToArray } from '../utils';

const Members: React.FC = () => {
  const router = useRouter();
  const search = queryAttrToString(router.query.sok);
  const parties = queryAttrToArray(router.query.party);

  return (
    <div style={{ display: 'flex' }}>
      <Container>
        <Grid container spacing={3} justify="center">
          <MemberList parties={parties} search={search} />
        </Grid>
      </Container>
      <MembersFilter router={router} parties={parties} search={search} />
    </div>
  );
};

export default Members;
