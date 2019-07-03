import React from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';

import Member from '../Member';
import { useFilter } from '../../../../components/FilterContainer';

const MemberList = ({ members }) => {
  const { parties } = useFilter()[0];
  return (
    <Grid container spacing={3} justify="center">
      {members.map(member => (
        <Member
          member={member}
          key={member.id}
          show={parties.length === 0 || parties.includes(member.parti)}
        />
      ))}
    </Grid>
  );
};

MemberList.propTypes = {
  members: PropTypes.array.isRequired
};

export default MemberList;
