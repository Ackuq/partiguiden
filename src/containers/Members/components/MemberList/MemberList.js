import React from 'react';
import Grid from '@material-ui/core/Grid';

import Member from '../Member';

const MemberList = ({ members }) => (
  <Grid container spacing={3} justify="center">
    {members.map(member => (
      <Member member={member} key={member.intressent_id} />
    ))}
  </Grid>
);

export default MemberList;
