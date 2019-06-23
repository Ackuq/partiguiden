import React from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';

import Member from '../Member';
import { useStateValue } from '../../../../lib/stateProvider';

const MemberList = ({ members }) => {
  const { memberFilter } = useStateValue()[0];
  return (
    <Grid container spacing={3} justify="center">
      {members.map(member => (
        <Member
          member={member}
          key={member.id}
          show={memberFilter.parties.length === 0 || memberFilter.parties.includes(member.parti)}
        />
      ))}
    </Grid>
  );
};

MemberList.propTypes = {
  members: PropTypes.array.isRequired
};

export default MemberList;
