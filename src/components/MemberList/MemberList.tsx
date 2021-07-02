import React, { useEffect, useState, useCallback } from 'react';

import { Grid } from '@material-ui/core';

import useStyles from './useStyles';
import Member from './Member';
import { Member as MemberType } from '../../types/member';
import { PartyAbbreviation } from '../../utils/parties';

interface Props {
  filter: {
    search: string;
    parties: Array<PartyAbbreviation>;
  };
  members: Array<MemberType>;
}

const MemberList: React.FC<Props> = ({ members, filter }) => {
  const classes = useStyles();
  const [filteredMembers, setFilteredMembers] = useState(members);
  const [membersInView, setMembersInView] = useState(members.slice(0, 20));

  const handleScroll = useCallback(() => {
    const bottom =
      Math.ceil(window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight - 20;

    if (bottom && membersInView.length < filteredMembers.length) {
      setMembersInView((prevState) => {
        return [
          ...prevState,
          ...filteredMembers.slice(
            prevState.length,
            prevState.length + Math.min(filteredMembers.length - prevState.length, 20)
          ),
        ];
      });
    }
  }, [filteredMembers, membersInView.length]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  useEffect(() => {
    const newMembers = members.filter((member) => {
      const inParty = filter.parties.length
        ? filter.parties.includes(member.party as PartyAbbreviation)
        : true;
      const inSearch = `${member.firstName} ${member.lastName}`
        .toLowerCase()
        .includes(filter.search.toLowerCase());
      return inParty && inSearch;
    });
    setFilteredMembers(newMembers);
    setMembersInView(newMembers.slice(0, Math.min(10, newMembers.length)));
  }, [filter, members]);

  return (
    <>
      {membersInView.map((member) => {
        const inParty = filter.parties.length
          ? filter.parties.includes(member.party as PartyAbbreviation)
          : true;
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
