import React from 'react';

import Grid from '@material-ui/core/Grid';

import Member from './Member';
import useStyles from './useStyles';
import { Member as MemberType } from '../../types/member';
import { PartyAbbreviation } from '../../types/party';

interface Props {
  filter: {
    search: string;
    parties: Array<PartyAbbreviation>;
  };
  members: Array<MemberType>;
}

const MemberList: React.FC<Props> = ({ members, filter }) => {
  const classes = useStyles();

  return (
    <>
      {members.map((member) => {
        const inParty = filter.parties.length ? filter.parties.includes(member.party) : true;
        const inSearch = `${member.firstName} ${member.lastName}`
          .toLowerCase()
          .includes(filter.search.toLowerCase());

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
