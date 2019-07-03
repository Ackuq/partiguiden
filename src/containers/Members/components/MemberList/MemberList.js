import React, { useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import Router from 'next/router';

import Member from '../Member';
import { useFilter } from '../../../../components/FilterContainer';

const MemberList = ({ members }) => {
  const { parties } = useFilter()[0];

  const updateRoute = () => {
    const partyString = parties.length > 0 && `party=${parties.join('&party=')}`;
    let href = '';
    if (partyString) href += `?${partyString}`;
    Router.push(`/ledamoter${href}`);
  };

  useEffect(updateRoute, [parties]);

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
