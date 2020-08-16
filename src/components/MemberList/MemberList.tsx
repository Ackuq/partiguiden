import React from 'react';

import Grid from '@material-ui/core/Grid';

import Member from './Member';
import LoadCircle from '../LoadCircle';
import useStyles from './useStyles';
import { useMembers } from '../../hooks/parlimentHooks';

interface Props {
  parties: Array<string>;
  search: string;
}

const MemberList: React.FC<Props> = ({ parties, search }) => {
  const classes = useStyles();

  const members = useMembers();

  return !members ? (
    <LoadCircle />
  ) : (
    <>
      {members.map((member) => {
        const inParty = parties.length ? parties.includes(member.party) : true;
        const inSearch = `${member.firstName} ${member.lastName}`
          .toLowerCase()
          .includes(search.toLowerCase());

        return (
          <Grid
            item
            xs={12}
            md={6}
            xl={4}
            key={member.id}
            style={inParty && inSearch ? {} : { display: 'none' }}
          >
            <Member classes={classes} member={member} />
          </Grid>
        );
      })}
    </>
  );
};

export default MemberList;
