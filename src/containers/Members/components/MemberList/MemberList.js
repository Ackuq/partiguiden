import React from 'react';
import Grid from '@material-ui/core/Grid';

import Member from '../Member';
import { useStateValue } from '../../../../lib/stateProvider';

const MemberList = ({ members }) => {
  const { memberFilter } = useStateValue()[0];
  return (
    <Grid container spacing={3} justify="center">
      {members.map(member => (
        <Member
          member={member}
          key={member.intressent_id}
          show={memberFilter.parties.length === 0 || memberFilter.parties.includes(member.parti)}
        />
      ))}
    </Grid>
  );
};

export default MemberList;
